/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import "react-native-gesture-handler";
import {
	Button,
	SafeAreaView,
	TextInput,
	TouchableOpacity,
	Text,
	View,
	Image,
	Dimensions,
} from "react-native";
import styles from "../styles.js";
import firebase from "../config.js";

const Login = ({ navigation }: any): JSX.Element => {
	const [email, setEmail] = React.useState("");
	const [password, onChangePassword] = React.useState("");
	return (
		<SafeAreaView style={styles.container}>
			<View
				style={{
					justifyContent: "flex-start",
					height: Dimensions.get("window").height * 0.2,
				}}
			>
				<Image
					style={{
						margin: 0,
						alignSelf: "center",
						width: 120,
						top: -60,
					}}
					resizeMode={"contain"}
					source={require("../images/find5-1.png")}
					// source={require("../images/find5-2.png")}
				/>
			</View>
			<TextInput
				style={[styles.input, { width: 210 }]}
				onChangeText={setEmail}
				value={email}
				placeholder="Email address"
			/>
			<TextInput
				secureTextEntry={true}
				style={[styles.input, { width: 210 }]}
				onChangeText={onChangePassword}
				value={password}
				placeholder="Password"
			/>

			<TouchableOpacity
				style={[
					styles.button,
					{
						alignSelf: "center",
						borderColor: "black",
						width: 120,
						margin: 20,
						height: 35,
						borderRadius: 12,
					},
				]}
				onPress={() => {
					firebase
						.auth()
						.signInWithEmailAndPassword(email, password)
						.then((userCredential) => {
							// Signed in
							const user = userCredential.user;
							console.log(user);
							// ...
						})
						.catch((error) => {
							console.log(error);
							// const errorCode = error.code;
							// const errorMessage = error.message;
						});
					navigation.navigate("HomeScreen");
				}}
			>
				<Text
					style={[styles.button_text, { alignSelf: "center", fontSize: 18 }]}
				>
					Log in
				</Text>
			</TouchableOpacity>

			{/* <Button
				title="Log in"
				onPress={() => {
					firebase
						.auth()
						.signInWithEmailAndPassword(email, password)
						.then((userCredential) => {
							// Signed in
							const user = userCredential.user;
							console.log(user);
							// ...
						})
						.catch((error) => {
							console.log(error);
							// const errorCode = error.code;
							// const errorMessage = error.message;
						});
					navigation.navigate("HomeScreen", { users: users, teams: teams });
				}}
			/> */}
		</SafeAreaView>
	);
};

export default Login;
