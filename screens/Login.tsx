/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import "react-native-gesture-handler";
import { Button, SafeAreaView, TextInput } from "react-native";
import styles from "../styles.js";
import firebase from "../config.js";

const Login = ({ navigation }: any): JSX.Element => {
	const [email, setEmail] = React.useState("");
	const [password, onChangePassword] = React.useState("");
	return (
		<SafeAreaView>
			<TextInput
				style={styles.input}
				onChangeText={setEmail}
				value={email}
				placeholder="First Name"
			/>
			<TextInput
				style={styles.input}
				onChangeText={onChangePassword}
				value={password}
				placeholder="Last Name"
			/>
			<Button
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
				}}
			/>
		</SafeAreaView>
	);
};