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
	TouchableOpacity,
	Image,
	FlatList,
} from "react-native";
import styles from "../styles.js";
import firebase from "../config.js";
import "firebase/auth";
import { useState, useEffect } from "react";
import SelectMultiple from "react-native-select-multiple";
import { useCardAnimation } from "@react-navigation/stack";
import { getUsersTeams } from "../utils";

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
	const userID: null | string = firebase.auth().currentUser.uid;
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
	console.log("hi");
	const user = async () => {
		const userData = await ref.doc(userID).get();
		const userProfile = userData.data();
		console.log(userProfile);
		return userProfile;
	};

	useEffect(() => {
		user().then((results) => {
			setUserState(results);
		});
	}, []);
	// const teamsArr = getUsersTeams(userID);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Text style={styles.button_text}>
					{`⚽ Hi ${userState.firstName} (${userState.username}) ⚽`}
				</Text>
				<Image
					style={{
						marginBottom: 0,
						alignSelf: "center",
					}}
					fadeDuration={1500}
					resizeMode={"cover"}
					borderRadius={20}
					source={{
						width: 140,
						height: 140,
						uri: "https://i2-prod.manchestereveningnews.co.uk/incoming/article19885916.ece/ALTERNATES/s1200c/0_GettyImages-1231312492.jpg",
					}}
				/>
				<View
					style={{
						width: 260,
						backgroundColor: "rgba(250,250,250, 0.5)",
						borderRadius: 20,
						alignSelf: "center",
						padding: 10,
						margin: 15,

						// height: Dimensions.get("window").height * 0.15,
					}}
				>
					<Text style={{ margin: 5 }}>
						<Text style={{ fontWeight: "bold" }}>{"About me:\n"}</Text>
						{`"${userState.bio}"`}
					</Text>
					<Text style={{ margin: 5 }}>
						<Text style={{ fontWeight: "bold" }}>My location:</Text>
						{` ${userState.location}`}
					</Text>
					<Text style={{ margin: 5 }}>
						<Text style={{ fontWeight: "bold" }}>Preferred position:</Text>
						{` ${userState.position}`}
					</Text>
					<Text style={{ margin: 5 }}>
						<Text style={{ fontWeight: "bold" }}>Skill level:</Text>
						{` ${userState.skill}`}
					</Text>
					<Text style={{ margin: 5 }}>
						<Text style={{ fontWeight: "bold" }}>{"My availability:\n"}</Text>
						{`${userState.availability}`}
					</Text>
				</View>

				<TouchableOpacity
					style={[
						styles.button,
						{
							alignSelf: "center",
							borderColor: "black",
							borderWidth: 0.5,
							height: 35,
							borderRadius: 12,
							position: "relative",
							width: 140,
							bottom: -12,
						},
					]}
					onPress={() => navigation.navigate("Register")}
				>
					<Text
						style={[styles.button_text, { alignSelf: "center", fontSize: 18 }]}
					>
						Edit my profile
					</Text>
				</TouchableOpacity>

				<StatusBar />
			</ScrollView>
		</SafeAreaView>
	);
};

export default MyProfile;
