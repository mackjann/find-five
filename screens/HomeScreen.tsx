/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "react-native-gesture-handler";
import {
	Text,
	SafeAreaView,
	ScrollView,
	Button,
	StatusBar,
} from "react-native";
import styles from "../styles.js";
import firebase from "../config";
import "firebase/auth";
import { useDerivedValue } from "react-native-reanimated";

const userID = firebase.auth().currentUser;

const HomeScreen = ({ navigation }: any): JSX.Element => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Text
					style={{
						textAlign: "center",
						fontWeight: "bold",
						fontSize: 18,
						marginTop: 30,
						marginBottom: 30,
					}}
				>
					findFive
				</Text>
				<Button
					title="My Profile"
					onPress={() => navigation.navigate("MyProfile")}
				/>
				<Button
					title="My Teams"
					onPress={() => navigation.navigate("MyTeamsList")}
				/>
				<Button
					title="Search Teams"
					onPress={() => navigation.navigate("SearchTeams")}
				/>
				<Button
					title="Search Players"
					onPress={() => navigation.navigate("Register")}
				/>
				<Button
					title="TESTAUTH"
					onPress={() => {
						firebase
							.firestore()
							.collection("users")
							.doc(`${userID.uid}`)
							.onSnapshot((user) => {
								console.log(user.data().username);
							});
					}}
				/>

				<Button
					title="Sign Out"
					onPress={() => {
						firebase
							.auth()
							.signOut()
							.then(() => {
								// Sign-out successful.
							})
							.catch((error) => {
								// An error happened.
							});
						navigation.navigate("Home");
					}}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;
