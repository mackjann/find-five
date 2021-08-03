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
	View,
	Image,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import styles from "../styles.js";
import firebase from "../config.js";

import "firebase/auth";
import {
	createTeam,
	addPlayer,
	deleteTeam,
	deleteUser,
	editUserInfo,
	removeTeamMember,
	editTeamInfo,
	acceptInvite,
	declineInvite,
	createUser,
	getUser,
	getTeam,
	getMembersOfTeam,
	getUsersTeams,
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
					//console.log(teams.length);
				});
			}),
		[]
	);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View
					style={{
						justifyContent: "flex-start",
						height: Dimensions.get("window").height * 0.25,
					}}
				>
					<Image
						style={{
							margin: 0,
							alignSelf: "center",
							width: 150,
							top: -30,
						}}
						resizeMode={"contain"}
						source={require("../images/find5-1.png")}
						// source={require("../images/find5-2.png")}
					/>
				</View>
				<Text
					style={[
						styles.button_text,
						{
							textAlign: "center",
							fontWeight: "bold",
							fontSize: 18,
							marginTop: 30,
							marginBottom: 30,
							width: 260,
						},
					]}
				>
					Find your 5 right now!
				</Text>

				<TouchableOpacity
					style={[styles.button, { alignSelf: "center" }]}
					onPress={() =>
						navigation.navigate("Login", { users: users, teams: teams })
					}
				>
					<Text style={styles.button_text}>Log in</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.button, { alignSelf: "center" }]}
					onPress={() =>
						navigation.navigate("Register", { users: users, teams: teams })
					}
				>
					<Text style={styles.button_text}>Register</Text>
				</TouchableOpacity>

				{/* <Button
					title="db test button"
					onPress={() => {
						getUsersTeams("1aSoETiNejUYyr9PlNAhvD76Pzx1");
					}}
				/>
				<Button
					title="Login"
					onPress={() =>
						navigation.navigate("Login", { users: users, teams: teams })
					}
				/>

				<Button
					title="Register"
					onPress={() =>
						navigation.navigate("Register", { users: users, teams: teams })
					}
				/> */}

				{/* <Button
					title="MyProfile"
					onPress={() => navigation.navigate("MyProfile", { users: users })}
				/>

				<Button
					title="Search for players"
					onPress={() =>
						navigation.navigate("Search", { users: users, teams: teams })
					}
				/> */}
				{/* <Button
					title="DEV ACCESS HomeScreen"
					onPress={() =>
						navigation.navigate("HomeScreen", { users: users, teams: teams })
					}
				/> */}

				<StatusBar />
			</ScrollView>
		</SafeAreaView>
	);
};

export default Home;
