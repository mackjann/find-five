/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "react-native-gesture-handler";
import * as React from "react";
import { SafeAreaView, TextInput, Button } from "react-native";
import styles from "../styles";

// interface User {
// 	LastName: string;
// 	ageGroup: string;
// 	availability: any;
// 	bio: string;
// 	email: string;
// 	firstName: string;
// 	location: string;
// 	position: {
// 		DEF: boolean;
// 		GK: boolean;
// 		MID: boolean;
// 		ST: boolean;
// 		noPref: boolean;
// 	};
// 	profilePic?: boolean;
// 	skill: string;
// 	username: string;
// }

const Register = ({ navigation }: any): JSX.Element => {
	const [firstName, setFirstName] = React.useState("");
	const [lastName, setLastName] = React.useState("");
	const [email, setEmail] = React.useState("");
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
