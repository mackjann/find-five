/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { LogBox } from "react-native";
import "react-native-gesture-handler";
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
import { getUsersTeams, removeTeamMember } from "../utils.js";
import firebase from "../config";
import "firebase/auth";

LogBox.ignoreLogs(["Setting a timer for a long period"]);
LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
LogBox.ignoreLogs(["VirtualizedList: missing keys for items"]);
LogBox.ignoreLogs(["source.uri should not be an empty string"]);

const MyTeams = ({ navigation }: any): JSX.Element => {
	interface Teams {
		[index: number]: {
			id: string;
			pic: string;
			teamName: string;
			location: string;
		};
	}
	const userID: null | string = firebase.auth().currentUser.uid;

	const [teams, setTeams] = React.useState([
		{ id: "", pic: "", teamName: "", location: "" },
	]);

	useEffect(() => {
		getUsersTeams(userID).then((res) => {
			console.log(res);
			setTeams(res);
		});
	}, [teams]);

	// console.log(teams, "<---- teams");

	return (
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
							width: 40,
							top: -12,
						}}
						resizeMode={"contain"}
						source={require("../images/find5-icon-no-bg.png")}
					/>
					<Text style={styles.button_text}>{" My Teams"}</Text>
				</View>

				{teams.map((team) => {
					return (
						<View key={team.id}>
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
									margin: 0,
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
											width: 45,
											height: 45,
											uri: team.pic,
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
											width: 150,
										}}
									>
										<Text
											style={{
												fontWeight: "bold",
												fontSize: 16,
												textTransform: "capitalize",
											}}
										>{`${team.teamName}`}</Text>
									</View>
									<Text style={{ margin: 1 }}>
										<Text style={{ fontWeight: "bold" }}>{"Location:"}</Text>
										{` ${team.location}`}
									</Text>
								</View>

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
												width: 50,
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
										>
											{"Team\npage"}
										</Text>
									</TouchableOpacity>

									<TouchableOpacity
										style={[
											styles.small_button,
											{
												borderWidth: 0.5,
												height: 46,
												borderRadius: 5,
												width: 45,
												margin: 3,
												marginTop: 0,
											},
										]}
										onPress={() => {
											removeTeamMember(team.id, userID);
										}}
									>
										<Text
											style={[
												styles.button_text,
												{ alignSelf: "center", fontSize: 14 },
											]}
										>
											{"Leave"}
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
					);
				})}
				<TouchableOpacity
					style={[
						styles.small_button,
						{
							borderWidth: 0.5,
							height: 35,
							borderRadius: 12,
							width: 200,
						},
					]}
					onPress={() => navigation.navigate("CreateTeam")}
				>
					<Text
						style={[styles.button_text, { alignSelf: "center", fontSize: 18 }]}
					>
						Create a New Team
					</Text>
				</TouchableOpacity>
				<StatusBar />
			</ScrollView>
		</SafeAreaView>
	);
};

export default MyTeams;
