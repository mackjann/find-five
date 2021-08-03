/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "react-native-gesture-handler";
import * as React from "react";
import {
	SafeAreaView,
	TextInput,
	Button,
	View,
	Dimensions,
	Image,
	Text,
	TouchableOpacity,
} from "react-native";
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
				style={styles.reg_input}
				onChangeText={setFirstName}
				value={firstName}
				placeholder="First Name"
			/>
			<TextInput
				style={styles.reg_input}
				onChangeText={setLastName}
				value={lastName}
				placeholder="Last Name"
			/>
			<TextInput
				style={styles.reg_input}
				onChangeText={setEmail}
				value={email}
				placeholder="Email Address"
			/>
			<TextInput
				style={styles.reg_input}
				onChangeText={setUsername}
				value={username}
				placeholder="Username"
			/>
			<TextInput
				secureTextEntry={true}
				style={styles.reg_input}
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
			>
				<Text
					style={[styles.button_text, { alignSelf: "center", fontSize: 18 }]}
				>
					Submit
				</Text>
			</TouchableOpacity>

			{/* <Button
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
						users: users,
						teams: teams,
					});
				}}
			></Button> */}
		</SafeAreaView>
	);
};

export default Register;
