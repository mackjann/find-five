/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { LogBox } from "react-native";
import "react-native-gesture-handler";
// import BouncyCheckbox from "react-native-bouncy-checkbox";
import {
	Text,
	View,
	SafeAreaView,
	ScrollView,
	Button,
	StatusBar,
	Image,
	FlatList,
} from "react-native";
import styles from "../styles.js";
import firebase from "../config.js";
import { useState, useEffect } from "react";
import SelectMultiple from "react-native-select-multiple";

LogBox.ignoreLogs(["Setting a timer for a long period"]);
LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
LogBox.ignoreLogs(["VirtualizedList: missing keys for items"]);

const ref = firebase.firestore().collection("users");
// const getEmail = () =>
// 	ref.onSnapshot(({ docs }) => {
// 		docs.forEach((doc) => {
// 			console.log(doc.data().username);
// 		});
// 	});
interface User {
	LastName: string;
	ageGroup: string;
	availability: any;
	bio: string;
	email: string;
	firstName: string;
	location: string;
	position: {
		DEF: boolean;
		GK: boolean;
		MID: boolean;
		ST: boolean;
		noPref: boolean;
	};
	profilePic?: boolean;
	skill: string;
	username: string;
}

const MyProfile = ({ navigation }: any): JSX.Element => {
	const [user, setUser] = useState<User>({
		LastName: "",
		ageGroup: "",
		availability: {},
		bio: "",
		email: "",
		firstName: "",
		location: "",
		position: { DEF: false, GK: false, MID: false, ST: false, noPref: false },

		skill: "",
		username: "",
	});

	useEffect(
		() =>
			ref.onSnapshot(({ docs }) => {
				setUser(docs[3].data());
				// console.log(docs[3].data());
			}),
		[]
	);

	const availability = [];

	for (const key in user.availability) {
		if (user.availability[key]) {
			availability.push(key);
		}
		// console.log(availability);
	}

	// const Item = ({ item }) => (
	// 	<View>
	// 		<Text style={styles.info}>{item.title}</Text>
	// 	</View>
	// );

	// const renderItem = (item: string) => <Item title={item} />;

	const timeSlots = ["Monday AM", "Monday PM", "Tuesday AM", "Tuesday PM"];
	const [selectedTimes, setSelectedTimes] = useState([]);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Text
					style={{
						alignSelf: "center",
						fontWeight: "bold",
						fontSize: 18,
						marginTop: 20,
						marginBottom: 20,
						width: 200,
					}}
				>
					{`Hi ${user.firstName} (${user.username})`}
				</Text>
				<Image
					style={{
						marginBottom: 0,
						alignSelf: "center",
					}}
					fadeDuration={3000}
					resizeMode={"cover"}
					loadingIndicatorSource={require("../assets/favicon.png")}
					borderRadius={50}
					source={{
						width: 140,
						height: 140,
						uri: "https://picsum.photos/160/160",
					}}
				/>
				<Text style={styles.info}>{`About me: "${user.bio}"`}</Text>
				<Text style={styles.info}>{`My location: ${user.location}`}</Text>
				<Text style={styles.info}>
					{`Preferred position: ${
						user.position && user.position.DEF
							? "Defender"
							: user.position && user.position.GK
								? "Goalkeeper"
								: user.position && user.position.MID
									? "Midfielder"
									: user.position && user.position.ST
										? "Striker"
										: user.position && user.position.noPref
											? "No preference"
											: "any"
					}`}
				</Text>
				<Text style={styles.info}>{`Skill level: ${user.skill}`}</Text>
				<Text style={styles.info}>{"My availability:"}</Text>
				<View style={styles.container}>
					<FlatList
						data={availability}
						numColumns={2}
						renderItem={({ item }) => (
							<Text style={styles.list} key={item}>
								- {item.slice(0, item.length - 2)}{" "}
								{item.slice(item.length - 2, item.length - 1)}
								{item.slice(item.length - 1)}
							</Text>
						)}
					/>
				</View>
				{/* <BouncyCheckbox
					size={25}
					fillColor="green"
					unfillColor="#FFFFFF"
					text="Monday AM"
					iconStyle={{ borderColor: "green" }}
					// textStyle={{ fontFamily: "Arial" }}
					onPress={(isChecked: boolean) => {
						console.log("checkbox working");
						isChecked ? setAvailableMondayAM(true) : null;
						console.log(availableMondayAM, "<< available?");
					}}
				/> */}
				{/* <FlatList
					data={availability}
					renderItem={renderItem}
					keyExtractor={(item) => item}
				/> */}
				{/* {availability.map((entry)=>{
                    <FlatList
                })
} */}
				{/* <Button title="TEST BUTTON" onPress={getEmail} /> */}

				<View>
					<SelectMultiple
						items={timeSlots}
						selectedItems={selectedTimes}
						onSelectionsChange={(selectedTimes: any) => {
							setSelectedTimes(selectedTimes);
							console.log(selectedTimes);
						}}
					/>
				</View>

				<Button
					title="Edit my profile"
					onPress={() => navigation.navigate("Register")}
				/>
				<StatusBar />
			</ScrollView>
		</SafeAreaView>
	);
};

export default MyProfile;
