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
} from "react-native";
import styles from "../styles.js";
import firebase from "../config.js";
import { addPlayer } from "../utils.js";

const ref = firebase.firestore().collection("users");
const getEmail = () =>
	ref.onSnapshot(({ docs }) => {
		docs.forEach((doc) => {
			console.log(doc.data().username);
		});
	});

const Home = ({ navigation }: any): JSX.Element => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Text
					style={{
						textAlign: "center",
						fontWeight: "bold",
						fontSize: 18,
						marginTop: 30,
						marginBottom: 30,
						width: 200,
					}}
				>
					CYBER-DRIP
				</Text>

				<Button
					title="add player"
					onPress={() => {
						addPlayer("V3CvouPIpzo6ehGeYBF4", "JszP5Y9yytV6pfGSUGe9");
					}}
				/>
				<Button
					title="Register"
					onPress={() => navigation.navigate("Register")}
				/>

				<StatusBar />
			</ScrollView>
		</SafeAreaView>
	);
};

export default Home;
