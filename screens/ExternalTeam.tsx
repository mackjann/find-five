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

const ExternalTeam = ({ navigation, route }: any): JSX.Element => {
	const { teamName } = route.params;
	const { teams } = route.params;

	const [team, setTeam] = useState({});

	useEffect(
		() =>
			teams.forEach((footieTeam) => {
				if (footieTeam.teamName === teamName) {
					setTeam(footieTeam);
					console.log(footieTeam);
				}
			}),

		[]
	);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Text style={styles.button_text}>⚽ {team.teamName} ⚽</Text>
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
						<Text
							style={{ fontWeight: "bold" }}
						>{`${team.teamName}'s pitch location:`}</Text>
						{` ${team.venueLocation}`}
					</Text>
					<Text style={{ margin: 5 }}>
						<Text style={{ fontWeight: "bold" }}>{"Looking for: "}</Text>
						{"TBC - array?"}
					</Text>

					<Text style={{ margin: 5 }}>
						<Text style={{ fontWeight: "bold" }}>{"Playing schedule: "}</Text>
						{"TBC - array?"}
					</Text>

					<Text style={{ margin: 5 }}>
						<Text style={{ fontWeight: "bold" }}>{"Contact details:\n "}</Text>
						{`Admin's email address? ${team.admin}`}
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
							Request to Join
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.small_button,
							{
								borderWidth: 0.5,
								height: 35,
								borderRadius: 12,
								width: 100,
							},
						]}
					>
						<Text
							style={[
								styles.button_text,
								{ alignSelf: "center", fontSize: 18 },
							]}
						>
							Message
						</Text>
					</TouchableOpacity>
				</View>
				<StatusBar />
			</ScrollView>
		</SafeAreaView>
	);
};

export default ExternalTeam;
