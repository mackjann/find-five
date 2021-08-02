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

LogBox.ignoreLogs(["Setting a timer for a long period"]);
LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
LogBox.ignoreLogs(["VirtualizedList: missing keys for items"]);

const MyTeams = ({ navigation, route }: any): JSX.Element => {
	// const { teamName } = route.params;
	const { teams } = route.params;

	// const [team, setTeam] = useState({});

	// useEffect(
	// 	() =>
	// 		teams.forEach((footieTeam) => {
	// 			if (footieTeam.teamName === teamName) {
	// 				setTeam(footieTeam);
	// 				console.log(footieTeam);
	// 			}
	// 		}),

	// 	[]
	// );

	const team = {
		admin: "8S5DTo8rbrb2aog1kLG9",
		availability: {
			fridayAM: true,
			fridayPM: true,
			mondayAM: true,
			mondayPM: true,
			saturdayAM: true,
			saturdayPM: true,
			sundayAM: true,
			sundayPM: true,
			thursdayAM: true,
			thursdayPM: true,
			tuesdayAM: true,
			tuesdayPM: true,
			wednesdayAM: true,
			wednesdayPM: true,
		},
		bio: "we da best!",
		lat: 53.42521,
		lng: -2.23027,
		lookingFor: {
			DEF: false,
			FWD: true,
			GK: true,
			MID: false,
		},
		teamName: "cyber drip",
		teamPic: true,
		venue: "Manchester",
		venueLocation: "M20",
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Text style={styles.button_text}>⚽My Teams⚽</Text>

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
							width: 45,
							height: 45,
							uri: "https://logos-world.net/wp-content/uploads/2020/06/England-logo.png",
						}}
					/>
					<Text style={{ margin: 5 }}>
						<Text
							style={{ fontWeight: "bold", textTransform: "capitalize" }}
						>{`${team.teamName}`}</Text>
					</Text>
					<Text style={{ margin: 5 }}>
						<Text style={{ fontWeight: "bold" }}>{"Location\n"}</Text>
						{`${team.venueLocation}`}
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
									teamName: team.teamName,
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
