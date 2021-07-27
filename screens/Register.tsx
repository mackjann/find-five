/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "react-native-gesture-handler";
import * as React from "react";
import { SafeAreaView, TextInput, Button } from "react-native";
import styles from "../styles";

const Register = ({ navigation }: any): JSX.Element => {
	const [text, onChangeText] = React.useState("");
	const [email, onChangeEmail] = React.useState("");
	const [password, onChangePassword] = React.useState("");

	return (
		<SafeAreaView>
			<TextInput
				style={styles.input}
				onChangeText={onChangeText}
				value={text}
				placeholder="Full Name"
			/>
			<TextInput
				style={styles.input}
				onChangeText={onChangeEmail}
				value={email}
				placeholder="Email Address"
			/>
			<TextInput
				style={styles.input}
				onChangeText={onChangePassword}
				value={password}
				placeholder="Password"
			/>
			<Button
				title="Submit"
				onPress={() => navigation.navigate("CreateProfile")}
			></Button>
		</SafeAreaView>
	);
};

export default Register;
