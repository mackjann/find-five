/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "react-native-gesture-handler";
import {
	Text,
	SafeAreaView,
	ScrollView,
	Button,
	StatusBar,
	TouchableOpacity,
	View,
	Dimensions,
} from "react-native";
import styles from "../styles.js";
import firebase from "../config";
import "firebase/auth";
import { useDerivedValue } from "react-native-reanimated";

const userID = firebase.auth().currentUser;

const HomeScreen = ({ navigation, route }: any): JSX.Element => {
	const { users } = route.params;
	const { teams } = route.params;
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Text style={styles.appHeader}>⚽ find5 ⚽</Text>
				<View style={{ flex: 1 }}>
					<View
						style={[styles.inner_container, { flex: 5, flexDirection: "row" }]}
					>
						<TouchableOpacity
							style={styles.button}
							onPress={() => navigation.navigate("MyProfile")}
						>
							<Text style={styles.button_text}>👤 My Profile</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.button}
							onPress={() => navigation.navigate("MyTeams", { teams: teams })}
						>
							<Text style={styles.button_text}> 👥 My Teams</Text>
						</TouchableOpacity>
					</View>
					<View
						style={[
							styles.inner_container,
							{ flex: 4, flexDirection: "column" },
						]}
					>
						<View
							style={{
								width: 300,
								backgroundColor: "rgba(250,250,250, 0.5)",
								borderRadius: 15,
								alignSelf: "center",
								// height: Dimensions.get("window").height * 0.15,
							}}
						>
							<Text style={styles.question}>
								Looking to connect with teams or players in your area?
							</Text>
						</View>

						<TouchableOpacity
							style={[
								styles.small_button,
								{ position: "relative", bottom: 17 },
							]}
							onPress={() =>
								navigation.navigate("Search", { users: users, teams: teams })
							}
						>
							<Text style={[styles.button_text]}>Search now</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[
								styles.small_button,
								{ position: "relative", bottom: 17 },
							]}
							onPress={() => navigation.navigate("CreateTeam")}
						>
							<Text style={[styles.button_text]}>Create Team Test</Text>
						</TouchableOpacity>
					</View>
					<View
						style={[
							styles.container,
							{
								flex: 2,
								flexDirection: "row",

								height: Dimensions.get("window").height * 0.25,
								justifyContent: "flex-end",
								alignItems: "flex-end",
								alignContent: "flex-end",
							},
						]}
					>
						<View></View>
						<TouchableOpacity
							style={[
								styles.small_button,
								{ position: "absolute", bottom: -5 },
							]}
							onPress={() => {
								firebase
									.auth()
									.signOut()
									.then(() => {
										console.log("Sign out successful");
										// Sign-out successful.
									})
									.catch((error) => {
										// An error happened.
										console.log(error);
									});
								navigation.navigate("Home");
							}}
						>
							<Text style={styles.button_text}>Sign out</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;
