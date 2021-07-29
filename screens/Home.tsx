/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import "react-native-gesture-handler";
import { useState, useEffect } from "react";
import {
	Text,
	SafeAreaView,
	ScrollView,
	Button,
	StatusBar,
} from "react-native";
import styles from "../styles.js";
import firebase from "../config.js";

import { uploadImageToStorage } from "../utils.js";


import "firebase/auth";
import {
	addPlayer,
	deleteTeam,
	deleteUser,
	editUserInfo,
	removeTeamMember,
	editTeamInfo,
	acceptInvite,
	declineInvite,
} from "../utils.js";



const ref = firebase.firestore().collection("users");

const ref2 = firebase.firestore().collection("teams");

// const getEmail = () =>
// 	ref.onSnapshot(({ docs }) => {
// 		docs.forEach((doc) => {
// 			console.log(doc.data().username);
// 		});
// 	});

const Home = ({ navigation }: any): JSX.Element => {
	const [users, setUsers] = useState([]);
	const [teams, setTeams] = useState([]);
	const usersFromDB = [];
	const teamsFromDB = [];

	useEffect(
		() =>
			ref.onSnapshot(({ docs }) => {
				docs.forEach((doc) => {
					usersFromDB.push(doc.data());
					setUsers(usersFromDB);
					// console.log(users);
				});
			}),
		[]
	);

	useEffect(
		() =>
			ref2.onSnapshot(({ docs }) => {
				// console.log(docs[0].data());
				docs.forEach((doc) => {
					teamsFromDB.push(doc.data());
					setTeams(teamsFromDB);
					console.log(teams.length);
				});
			}),
		[]
	);

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
						width: 200,
					}}
				>
					CYBER-DRIP
				</Text>

				<Button
					title="addplayer"
					onPress={() => {
						declineInvite("V3CvouPIpzo6ehGeYBF4", "JszP5Y9yytV6pfGSUGe9");
					}}
				/>
				<Button
					title="Register"
					onPress={() => navigation.navigate("Register")}
				/>

				<Button
					title="MyProfile"
					onPress={() => navigation.navigate("MyProfile", { users: users })}
				/>

				<Button
					title="Search for players"
					onPress={() =>
						navigation.navigate("Search", { users: users, teams: teams })
					}
				/>
				<Button
					title="HomeScreenTest"
					onPress={() => navigation.navigate("HomeScreen")}
				/>

				<StatusBar />
			</ScrollView>
		</SafeAreaView>
	);
};

export default Home;
