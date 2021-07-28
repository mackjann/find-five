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

const HomeScreen = ({ navigation }: any): JSX.Element => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Text
					onPress={() => navigation.navigate("MyProfile")}
					style={{
						textAlign: "right",
						fontSize: 14,
						marginTop: 5,
						marginRight: 30,
					}}
				>
					My Profile
				</Text>

				<Text
					style={{
						textAlign: "center",
						fontWeight: "bold",
						fontSize: 18,
						marginTop: 30,
						marginBottom: 30,
					}}
				>
					findFive
				</Text>

				<Button
					title="My Teams"
					onPress={() => navigation.navigate("Register")}
				/>
				<Button
					title="Search Teams"
					onPress={() => navigation.navigate("Register")}
				/>
				<Button
					title="Search Players"
					onPress={() => navigation.navigate("Register")}
				/>

				<StatusBar />
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;
