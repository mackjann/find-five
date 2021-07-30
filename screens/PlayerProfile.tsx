/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { LogBox } from "react-native";
import "react-native-gesture-handler";
// import BouncyCheckbox from "react-native-bouncy-checkbox";
import {
	Text,
	View,
	SafeAreaView,
	ScrollView,
	Button,
	StatusBar,
	Image,
	FlatList,
} from "react-native";
import styles from "../styles.js";
import { useState, useEffect } from "react";

LogBox.ignoreLogs(["Setting a timer for a long period"]);
LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
LogBox.ignoreLogs(["VirtualizedList: missing keys for items"]);

interface User {
	LastName: string;
	ageGroup: string;
	availability: any;
	bio: string;
	email: string;
	firstName: string;
	location: string;
	position: {
		DEF: boolean;
		GK: boolean;
		MID: boolean;
		ST: boolean;
		noPref: boolean;
	};
	profilePic?: boolean;
	skill: string;
	username: string;
}

const PlayerProfile = ({ navigation, route }: any): JSX.Element => {
	const { username } = route.params;
	const { users } = route.params;

	const [user, setUser] = useState<User>({
		LastName: "",
		ageGroup: "",
		availability: {},
		bio: "",
		email: "",
		firstName: "",
		location: "",
		position: { DEF: false, GK: false, MID: false, ST: false, noPref: false },

		skill: "",
		username: "",
	});

	useEffect(
		() =>
			users.forEach((player) => {
				if (player.username === username) {
					setUser(player);
					console.log(user);
				}
			}),

		[]
	);

	const availability = [];

	for (const key in user.availability) {
		if (user.availability[key]) {
			availability.push(key);
		}
	}

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
					{user.username}
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
						uri: "https://picsum.photos/160/160",
					}}
				/>
				<Text
					style={styles.info}
				>{`About ${user.username}: "${user.bio}"`}</Text>
				<Text
					style={styles.info}
				>{`${user.username}'s location: ${user.location}`}</Text>
				<Text style={styles.info}>
					{`Preferred position: ${
						user.position && user.position.DEF
							? "Defender"
							: user.position && user.position.GK
								? "Goalkeeper"
								: user.position && user.position.MID
									? "Midfielder"
									: user.position && user.position.ST
										? "Striker"
										: user.position && user.position.noPref
											? "No preference"
											: "any"
					}`}
				</Text>
				<Text style={styles.info}>{`Skill level: ${user.skill}`}</Text>
				<Text style={styles.info}>{`${user.username}'s availability:`}</Text>
				<View style={styles.container}>
					<FlatList
						data={availability}
						numColumns={2}
						renderItem={({ item }) => (
							<Text style={styles.list} key={item}>
								- {item.slice(0, item.length - 2)}{" "}
								{item.slice(item.length - 2, item.length - 1)}
								{item.slice(item.length - 1)}
							</Text>
						)}
					/>
				</View>
				<Text style={styles.info}>{`Contact details: ${user.email} \n`}</Text>

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

export default PlayerProfile;
