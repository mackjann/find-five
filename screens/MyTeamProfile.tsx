/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { LogBox } from "react-native";
import "react-native-gesture-handler";
// import BouncyCheckbox from "react-native-bouncy-checkbox";
import {
	Text,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
	StatusBar,
	Image,
	View,
} from "react-native";
import styles from "../styles.js";
import { useState, useEffect } from "react";
import firebase from "../config";
import "firebase/auth";
import { getMembersOfTeam } from "../utils.js";

LogBox.ignoreLogs(["Setting a timer for a long period"]);
LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
LogBox.ignoreLogs(["VirtualizedList: missing keys for items"]);
const db = firebase.firestore();

const MyTeamProfile = ({ navigation, route }: any): JSX.Element => {
	// const { teamName } = route.params;
	const { teamID } = route.params;
	const eachPosition: Array<any> = [];
	const eachDate: Array<any> = [];
	const allMembers: Array<any> = [];

	const userID: null | string = firebase.auth().currentUser.uid;

	const [isAdmin, setIsAdmin] = React.useState(false);
	const [members, setMembers] = React.useState([]);
	const [team, setTeam] = React.useState({});

	useEffect(() => {
		db.collection("teams")
			.doc(teamID)
			.get()
			.then((res) => {
				setTeam(res.data());
			})
			.then(() => {
				if (team.admin === userID) {
					setIsAdmin(true);
				}
			});
	}, [team.admin]);

	useEffect(() => {
		getMembersOfTeam(teamID).then((members) => setMembers(members));
	}, []);

	console.log(isAdmin);
	return (
		// <Text>Bruh</Text>
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						justifyContent: "center",
						marginBottom: 10,
						width: 280,
						height: 55,
					}}
				>
					<Image
						style={{
							margin: 0,
							// alignSelf: "center",
							width: 40,
							top: -12,
						}}
						resizeMode={"contain"}
						source={require("../images/find5-icon-no-bg.png")}
						// source={require("../images/find5-2.png")}
					/>
					<Text style={styles.button_text}>{` ${team.teamName}`} </Text>
				</View>

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
						uri: "https://logos-world.net/wp-content/uploads/2020/06/England-logo.png",
					}}
				/>

				<View
					style={{
						width: 260,
						backgroundColor: "rgba(250,250,250, 0.5)",
						borderRadius: 20,
						alignSelf: "center",
						padding: 10,
						margin: 10,

						// height: Dimensions.get("window").height * 0.15,
					}}
				>
					<Text style={{ margin: 5 }}>
						<Text
							style={{ fontWeight: "bold" }}
						>{`About ${team.teamName}:`}</Text>

						{` "${team.bio}"`}
					</Text>

					<Text style={{ margin: 5 }}>
						<Text style={{ fontWeight: "bold" }}>Location:</Text>
						{` ${team.venue}, ${team.venueLocation}`}
					</Text>
					{/* <Text style={{ margin: 5 }}>
						<Text style={{ fontWeight: "bold" }}>{"Looking for: "}</Text>
						{/* {team.lookingFor[0].label} */}
					{/* {team.lookingFor.forEach((position: Record<string, unknown>) => {
							eachPosition.push(`${position.label} `);
						})} */}
					{/* {eachPosition} */}
					{/* </Text> */}

					{/* <Text style={{ margin: 5 }}>
						<Text style={{ fontWeight: "bold" }}>{"Playing schedule: "}</Text>
						{team.availability.forEach((date: Record<string, unknown>) => {
							eachDate.push(`\n - ${date.label} `);
						})}
						{eachDate}
					</Text> */}

					{/* <Text style={{ margin: 5 }}>
						<Text style={{ fontWeight: "bold" }}>{"Contact details:\n "}</Text>
						{`${.firstName} ${adminState.lastName}`}
						{`\n Email: ${adminState.email}`}
					</Text> */}
					<Text
						style={{ margin: 5 }}
						onPress={() => {
							navigation.navigate("HomeScreen");
						}}
					>
						<Text style={{ fontWeight: "bold" }}>{"Members:\n "}</Text>
						{members.forEach((member: Record<string, unknown>) => {
							const memberId = member.username;
							allMembers.push(
								`\n ${member.firstName} ${member.lastName} (${member.username})`
							);
						})}
						{allMembers}
					</Text>
				</View>

				<View
					style={[
						styles.container,
						{
							flex: 1,
							flexDirection: "row",
							justifyContent: "space-evenly",
						},
					]}
				>
					{isAdmin ? (
						<TouchableOpacity
							style={[
								styles.small_button,
								{
									borderWidth: 0.5,
									height: 35,
									borderRadius: 12,
									width: 140,
								},
							]}
						>
							<Text
								style={[
									styles.button_text,
									{ alignSelf: "center", fontSize: 18 },
								]}
							>
								Invite Player
							</Text>
						</TouchableOpacity>
					) : null}
				</View>
				<StatusBar />
			</ScrollView>
		</SafeAreaView>
	);
};

export default MyTeamProfile;
