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
	Button,
	StatusBar,
	Image,
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
				<Text
					style={{
						alignSelf: "center",
						textAlign: "center",
						fontWeight: "bold",
						fontSize: 18,
						marginTop: 20,
						marginBottom: 20,
						width: 200,
					}}
				>
					{team.teamName}
				</Text>
				<Image
					style={{
						marginBottom: 0,
						alignSelf: "center",
					}}
					fadeDuration={3000}
					resizeMode={"cover"}
					loadingIndicatorSource={require("../assets/favicon.png")}
					borderRadius={50}
					source={{
						width: 140,
						height: 140,
						uri: "https://picsum.photos/161/161",
					}}
				/>
				<Text
					style={styles.info}
				>{`About team ${team.teamName}: "${team.bio}"`}</Text>
				<Text
					style={styles.info}
				>{`${team.teamName}'s pitch location: ${team.venueLocation}`}</Text>
				<Text style={styles.info}>{"Looking for: TBC - array?"}</Text>

				<Text
					style={styles.info}
				>{"Contact details: TBC - admin's email? \n"}</Text>

				<Button
					title="Connect?"
					onPress={() => navigation.navigate("Register")}
				/>

				<Button
					title="Message?"
					onPress={() => navigation.navigate("Register")}
				/>
				<StatusBar />
			</ScrollView>
		</SafeAreaView>
	);
};

export default ExternalTeam;
