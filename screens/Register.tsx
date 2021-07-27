/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "react-native-gesture-handler";
import * as React from "react";
import { SafeAreaView, TextInput, Button } from "react-native";
import styles from "../styles";

const Register = ({ navigation }: any): JSX.Element => {
	const [text, onChangeText] = React.useState("");
	const [email, onChangeEmail] = React.useState("");

	return (
		<SafeAreaView>
			<TextInput
				style={styles.input}
				onChangeText={onChangeText}
				value={text}
				placeholder="Your name"
			/>
			<TextInput
				style={styles.input}
				onChangeText={onChangeEmail}
				value={email}
				placeholder="Your email address"
			/>
			<Button
				title="Submit"
				onPress={() => navigation.navigate("CreateProfile")}
			></Button>
		</SafeAreaView>
	);
};

export default Register;
