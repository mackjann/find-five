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
	TouchableOpacity,
	Dimensions,
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
				{/* <Text style={styles.button_text}>⚽ ⚽</Text> */}

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
					<Text style={styles.button_text}>{` ${user.username}`} </Text>
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
						uri: "https://i2-prod.manchestereveningnews.co.uk/incoming/article19885916.ece/ALTERNATES/s1200c/0_GettyImages-1231312492.jpg",
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
						>{`About ${user.username}:\n`}</Text>
						{`"${user.bio}"`}
					</Text>
					<Text style={{ margin: 5 }}>
						<Text style={{ fontWeight: "bold" }}>
							{`${user.username}'s location:`}
						</Text>
						{` ${user.location}`}
					</Text>
					<Text style={{ margin: 5 }}>
						<Text style={{ fontWeight: "bold" }}>Preferred position: </Text>
						{`${
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
					<Text style={{ margin: 5 }}>
						<Text style={{ fontWeight: "bold" }}>Skill level:</Text>
						{` ${user.skill}`}
					</Text>
					<Text style={{ margin: 5 }}>
						<Text
							style={{ fontWeight: "bold" }}
						>{`${user.username}'s availability:`}</Text>
					</Text>
					<View>
						<FlatList
							data={availability}
							numColumns={1}
							renderItem={({ item }) => (
								<Text style={styles.list} key={item}>
									- {item.slice(0, item.length - 2)}{" "}
									{item.slice(item.length - 2, item.length - 1)}
									{item.slice(item.length - 1)}
								</Text>
							)}
						/>
					</View>
					<Text style={{ margin: 5 }}>
						<Text
							style={{ fontWeight: "bold" }}
						>{`${user.username}'s contact details:\n`}</Text>
						{user.email}
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
								borderWidth: 2,
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
							Connect
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.small_button,
							{
								borderWidth: 2,
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

export default PlayerProfile;
