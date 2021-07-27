/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "react-native-gesture-handler";
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

const ref = firebase.firestore().collection("users");
// const getEmail = () =>
// 	ref.onSnapshot(({ docs }) => {
// 		docs.forEach((doc) => {
// 			console.log(doc.data().username);
// 		});
// 	});

const MyProfile = ({ navigation }: any): JSX.Element => {
	const [user, setUser] = useState({});

	useEffect(
		() =>
			ref.onSnapshot(({ docs }) => {
				setUser(docs[2].data());
				console.log(docs[2].data());
			}),
		[]
	);

	const availability = [];

	for (const key in user.availability) {
		if (user.availability[key]) {
			availability.push(key);
		}
		console.log(availability);
	}

	// const Item = ({ item }) => (
	// 	<View>
	// 		<Text style={styles.info}>{item.title}</Text>
	// 	</View>
	// );

	// const renderItem = (item: string) => <Item title={item} />;

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
