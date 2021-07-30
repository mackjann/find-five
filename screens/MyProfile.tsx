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
import "firebase/auth";
import { useState, useEffect } from "react";
import SelectMultiple from "react-native-select-multiple";
import { useCardAnimation } from "@react-navigation/stack";
import getUser from "../utils";

LogBox.ignoreLogs(["Setting a timer for a long period"]);
LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
LogBox.ignoreLogs(["VirtualizedList: missing keys for items"]);

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
	position: string;
	profilePic?: boolean;
	skill: string;
	username: string;
}

const MyProfile = ({ navigation }: any): JSX.Element => {
	const userID = firebase.auth().currentUser.uid;
	const ref = firebase.firestore().collection("users");

	const [userState, setUserState] = useState({
		LastName: "string",
		ageGroup: "string",
		availability: [],
		bio: "string",
		email: "string",
		firstName: "string",
		location: "string",
		position: "string",
		profilePic: true,
		skill: "string",
		username: "string",
	});

	const user = async () => {
		const userData = await ref.doc(userID).get();
		const userProfile = userData.data();
		return userProfile;
	};

	user().then((results) => {
		setUserState(results);
	});

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
					{`Hi ${userState.firstName} (${userState.username})`}
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
				<Text style={styles.info}>{`About me: "${userState.bio}"`}</Text>
				<Text style={styles.info}>{`My location: ${userState.location}`}</Text>
				<Text style={styles.info}>
					{`Preferred position: ${userState.position}`}
				</Text>
				<Text style={styles.info}>{`Skill level: ${userState.skill}`}</Text>
				<Text style={styles.info}>{"My availability:"}</Text>
				<View style={styles.container}>
					{/* <FlatList
						data={userState.availability}
						numColumns={2}
						renderItem={({ item }) => (
							<Text style={styles.list} key={item}>
								- {item.slice(0, item.length - 2)}{" "}
								{item.slice(item.length - 2, item.length - 1)}
								{item.slice(item.length - 1)}
							</Text>
						)}
					/>*/}
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

				{/* <View>
					<SelectMultiple
						items={timeSlots}
						selectedItems={selectedTimes}
						onSelectionsChange={(selectedTimes: any) => {
							setSelectedTimes(selectedTimes);
							console.log(selectedTimes);
						}}
					/>
				</View> */}

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
