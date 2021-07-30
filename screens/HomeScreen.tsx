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
} from "react-native";
import styles from "../styles.js";
import firebase from "../config";
import "firebase/auth";
import { useDerivedValue } from "react-native-reanimated";

const userID = firebase.auth().currentUser;

const HomeScreen = ({ navigation }: any): JSX.Element => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Text style={styles.appHeader}>⚽ findFive ⚽</Text>
				<View style={{ flex: 1 }}>
					<View
						style={[styles.inner_container, { flex: 5, flexDirection: "row" }]}
					>
						<TouchableOpacity
							style={styles.button}
							onPress={() => navigation.navigate("MyProfile")}
						>
							<Text style={styles.button_text}>My Profile</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.button}
							onPress={() => navigation.navigate("MyProfile")}
						>
							<Text style={styles.button_text}>My Teams</Text>
						</TouchableOpacity>
					</View>
					<View style={[styles.inner_container, { flex: 2 }]}>
						<Text>Looking for teams or players?</Text>

						<TouchableOpacity
							style={styles.small_button}
							onPress={() => navigation.navigate("Search")}
						>
							<Text style={styles.button_text}>Search</Text>
						</TouchableOpacity>
					</View>
					<View
						style={[
							styles.inner_container,
							{
								flexDirection: "row",

								justifyContent: "flex-end",
								alignItems: "flex-end",
								alignContent: "flex-end",
							},
						]}
					>
						<View></View>
						<TouchableOpacity
							style={styles.small_button}
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
