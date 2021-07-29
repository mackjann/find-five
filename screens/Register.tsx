/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "react-native-gesture-handler";
import * as React from "react";
import { SafeAreaView, TextInput, Button } from "react-native";
import styles from "../styles";
import firebase from "../config";
import "firebase/auth";

const Register = ({ navigation }: any): JSX.Element => {
	const [firstName, setFirstName] = React.useState("");
	const [lastName, setLastName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [username, setUsername] = React.useState("");
	const [password, onChangePassword] = React.useState("");

	return (
		<SafeAreaView>
			<TextInput
				style={styles.input}
				onChangeText={setFirstName}
				value={firstName}
				placeholder="First Name"
			/>
			<TextInput
				style={styles.input}
				onChangeText={setLastName}
				value={lastName}
				placeholder="Last Name"
			/>
			<TextInput
				style={styles.input}
				onChangeText={setEmail}
				value={email}
				placeholder="Email Address"
			/>
			<TextInput
				style={styles.input}
				onChangeText={setUsername}
				value={username}
				placeholder="Username"
			/>
			<TextInput
				style={styles.input}
				onChangeText={onChangePassword}
				value={password}
				placeholder="Password"
			/>
			<Button
				title="Submit"
				onPress={async () => {
					const createUserFunc = await firebase
						.auth()
						.createUserWithEmailAndPassword(email, password)
						.then((userCredential) => {
							// Signed in
							const user = userCredential.user;
							console.log(user, "<---");
							// ...
						})
						.catch((error) => {
							console.log(error);
							// ..
						});
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

					navigation.navigate("CreateProfile", {
						firstName: firstName,
						lastName: lastName,
						email: email,
						username: username,
						password: password,
					});
				}}
			></Button>
		</SafeAreaView>
	);
};

export default Register;
