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
import firebase from "../config.js";
import { useState, useEffect } from "react";

LogBox.ignoreLogs(["Setting a timer for a long period"]);
LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
LogBox.ignoreLogs(["VirtualizedList: missing keys for items"]);
LogBox.ignoreLogs([
	"Can't perform a React state update on an unmounted component",
]);
LogBox.ignoreLogs(["Each child in a list should have a unique 'key' prop"]);

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
	memberOf?: [];
}

const PlayerProfile = ({ navigation, route }: any): JSX.Element => {
	const { username } = route.params;
	const { users } = route.params;

	const [user, setUser] = useState<User>({
		LastName: "",
		ageGroup: "",
		availability: [{}],
		bio: "",
		email: "",
		firstName: "",
		location: "",
		position: { DEF: false, GK: false, MID: false, ST: false, noPref: false },
		memberOf: ["roq5OkphttPqeLDlXSUf"],
		skill: "",
		username: "",
	});

	const [teamState, setTeamState] = useState({
		teamName: "",
		availability: [{ label: "day", value: "day" }],
		admin: "",
		bio: "",
		id: "",
		lookingFor: [],
		teamPic: "",
		venue: "",
		venueLocation: "",
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

	const team = async (docID) => {
		const teamData = await firebase.firestore().doc(docID).get();
		const teamProfile = teamData.data();
		return teamProfile;
	};

	useEffect(() => {
		team(user.memberOf[0]).then((results) => {
			setTeamState(results);
		});
	}, [user]);

	const availability = [];

	for (const key in user.availability) {
		if (user.availability[key]) {
			availability.push(key);
		}
	}

	console.log(user, "<<< user ");

	console.log(teamState, "<<< teamState ");

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
					fadeDuration={1000}
					resizeMode={"cover"}
					borderRadius={70}
					source={{
						width: 140,
						height: 140,
						uri: user.profilePic,
					}}
				/>

				<View
					style={{
						width: 290,
						backgroundColor: "rgba(250,250,250, 0.5)",
						borderRadius: 10,
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
						{` ${user.position}`}
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
					<Text>
						{user.availability &&
							user.availability.map((day) => {
								return <Text key={day.value}>{`- ${day.value}\n`}</Text>;
							})}
						{/* <FlatList
							data={availability}
							numColumns={1}
							renderItem={({ item }) => (
								<Text style={styles.list} key={item}>
									- {item.slice(0, item.length - 2)}{" "}
									{item.slice(item.length - 2, item.length - 1)}
									{item.slice(item.length - 1)}
								</Text>
							)}
						/> */}
					</Text>
					<Text style={{ margin: 5 }}>
						<Text
							style={{ fontWeight: "bold" }}
						>{`${user.username}'s contact details:\n`}</Text>
						{user.email}
					</Text>

					<Text style={{ margin: 5 }}>
						<Text
							style={{ fontWeight: "bold" }}
						>{`${user.username}'s teams:\n`}</Text>
						{/* {user.memberOf[0]} */}
						{teamState.teamName}
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
