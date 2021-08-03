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
import { getUsersTeams } from "../utils.js";
import firebase from "../config";
import "firebase/auth";

LogBox.ignoreLogs(["Setting a timer for a long period"]);
LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
LogBox.ignoreLogs(["VirtualizedList: missing keys for items"]);

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
			setTeams(res);
		});
	}, []);

	console.log(teams, "<---- teams");

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Text style={styles.button_text}>My Teams</Text>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "flex-start",
						width: 300,
						backgroundColor: "rgba(250,250,250, 0.5)",
						borderRadius: 20,
						alignSelf: "center",
						padding: 10,
						margin: 10,

						// height: Dimensions.get("window").height * 0.15,
					}}
				>
					<Image
						style={{
							marginBottom: 0,
							alignSelf: "center",
						}}
						resizeMode={"cover"}
						source={{
							width: 25,
							height: 25,
							uri: teams[0].pic,
						}}
					/>
					<Text style={{ margin: 5 }}>
						<Text style={{ fontWeight: "bold", textTransform: "capitalize" }}>
							{`Names:\n ${teams[0].teamName}`}
						</Text>
					</Text>
					<Text style={{ margin: 5 }}>
						<Text style={{ fontWeight: "bold" }}>{"Location\n"}</Text>
						{`${teams[0].location}`}
					</Text>
					<View>
						<TouchableOpacity
							style={[
								styles.small_button,
								{
									borderWidth: 2,
									height: 30,
									borderRadius: 12,
									width: 90,
								},
							]}
							onPress={() =>
								navigation.navigate("ExternalTeam", {
									teamName: teams.teamName,
									teams: teams,
								})
							}
						>
							<Text
								style={[
									styles.button_text,
									{ alignSelf: "center", fontSize: 14 },
								]}
							>
								Team Page
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[
								styles.small_button,
								{
									borderWidth: 2,
									height: 30,
									borderRadius: 12,
									width: 90,
								},
							]}
						>
							<Text
								style={[
									styles.button_text,
									{ alignSelf: "center", fontSize: 14 },
								]}
							>
								Leave team
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
				>
					<TouchableOpacity
						style={[
							styles.small_button,
							{
								borderWidth: 2,
								height: 35,
								borderRadius: 12,
								width: 200,
							},
						]}
						onPress={() => navigation.navigate("CreateTeam")}
					>
						<Text
							style={[
								styles.button_text,
								{ alignSelf: "center", fontSize: 18 },
							]}
						>
							Create a New Team
						</Text>
					</TouchableOpacity>
				</View>
				<StatusBar />
			</ScrollView>
		</SafeAreaView>
	);
};

export default MyTeams;
