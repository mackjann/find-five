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
	TextInput,
} from "react-native";
import styles from "../styles.js";
import { useState, useEffect } from "react";
import firebase from "../config";
import "firebase/auth";
import { addPlayer, getMembersOfTeam, getUser } from "../utils.js";

LogBox.ignoreLogs(["Setting a timer for a long period"]);
LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
LogBox.ignoreLogs(["VirtualizedList: missing keys for items"]);
LogBox.ignoreLogs([
	"Can't peform a React state update on an unmounted component",
]);
LogBox.ignoreLogs(["Possible Unhandled Promise Rejection (id: 0):"]);
const db = firebase.firestore();

const MyTeamProfile = ({ navigation, route }: any): JSX.Element => {
	// const { teamName } = route.params;
	const { teamID } = route.params;
	const eachPosition: Array<any> = [];
	const eachDate: Array<any> = [];
	const allMembers: Array<any> = [];
	const allLookingFor: Array<any> = [];

	const userID: null | string = firebase.auth().currentUser.uid;

	const [isAdmin, setIsAdmin] = React.useState(false);
	const [members, setMembers] = React.useState([]);
	const [team, setTeam] = React.useState({});
	const [positions, setPositions] = React.useState([]);
	const [searchTerm, setSearchterm] = React.useState("");
	const [searchedPlayer, setSearchedPlayer] = React.useState({});
	const [isClicked, setIsClicked] = React.useState(false);

	useEffect(() => {
		if (team.lookingFor) {
			setPositions(team.lookingFor);
		}
	}, [team]);

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
	}, [members]);

	console.log(searchedPlayer, "<=== search");
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
						uri: team.teamPic,
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
					<Text style={{ margin: 5 }}>
						<Text style={{ fontWeight: "bold" }}>{"Looking for: \n"}</Text>
						{positions.forEach((position: Record<string, unknown>) => {
							const positionId = position.value;
							allLookingFor.push(`\n ${position.value}`);
						})}
						{allLookingFor}
					</Text>

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
							const memberId = member.id;
							const hasAccepted = member.status;
							// console.log(member, "<=== member");

							allMembers.push(
								`\n - ${member.data.firstName} ${member.data.lastName} (${
									member.data.username
								}) ${hasAccepted ? "accepted" : "pending"}\n `
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
						<View>
							<TextInput
								style={[styles.input]}
								onChangeText={(text) => {
									setSearchterm(text);
								}}
								value={searchTerm}
								placeholder="enter a username"
							/>
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
									onPress={() => {
										getUser(searchTerm).then((res) => {
											setSearchedPlayer(res);
											setIsClicked(true);
										});
									}}
								>
									Search
								</Text>
							</TouchableOpacity>
						</View>
					) : null}
					{isClicked ? (
						<View>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "flex-start",
									width: 320,
									height: 65,
									backgroundColor: "rgba(250,250,250, 0.7)",
									borderRadius: 2,
									alignSelf: "center",
									padding: 10,
									margin: 10,
								}}
							>
								<View
									style={{
										marginRight: 5,
									}}
								>
									<Image
										style={{
											alignSelf: "center",
											marginBottom: 6,
										}}
										resizeMode={"cover"}
										source={{
											width: 50,
											height: 50,
											uri: searchedPlayer.data.profilePic,
										}}
									/>
								</View>
								<View
									style={{
										justifyContent: "flex-start",
										alignItems: "flex-start",
										flexDirection: "column",
									}}
								>
									<View
										style={{
											flexDirection: "column",
											alignItems: "flex-start",
											paddingBottom: 2,
											margin: 1,
											borderBottomWidth: 1,
											borderBottomColor: "grey",
											width: 100,
										}}
									>
										<Text
											style={{
												fontWeight: "bold",
												fontSize: 16,
												textTransform: "capitalize",
											}}
										>
											{searchedPlayer.data.username}
										</Text>
									</View>
									<Text
										style={{ margin: 1 }}
									>{`${searchedPlayer.data.firstName} ${searchedPlayer.data.lastName}`}</Text>
								</View>
								<View
									style={{
										width: 20,
									}}
								></View>

								<View
									style={{ flexDirection: "row", alignItems: "flex-start" }}
								>
									<TouchableOpacity
										style={[
											styles.small_button,
											{
												borderWidth: 0.5,
												height: 46,
												borderRadius: 5,
												width: 55,
												margin: 3,
												marginTop: 0,
											},
										]}
										onPress={() =>
											navigation.navigate("MyTeamProfile", {
												teamID: team.id,
											})
										}
									>
										<Text
											style={[
												styles.button_text,
												{ alignSelf: "center", fontSize: 14 },
											]}
											onPress={() => {
												addPlayer(teamID, searchedPlayer.id);
											}}
										>
											{"invite"}
										</Text>
									</TouchableOpacity>
								</View>
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
							></View>
						</View>
					) : null}
				</View>
				<StatusBar />
			</ScrollView>
		</SafeAreaView>
	);
};

export default MyTeamProfile;
