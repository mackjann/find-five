/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "react-native-gesture-handler";
import * as React from "react";
import { SafeAreaView, TextInput, Button, Text } from "react-native";
import styles from "../styles";

const CreateProfile = ({ navigation }: any): JSX.Element => {
	const [location, onChangeLocation] = React.useState("");

	return (
		<SafeAreaView>
			<TextInput
				style={styles.input}
				onChangeText={onChangeLocation}
				value={location}
				placeholder="Your location"
			/>
			<Text>Please provide only the first 3 letters of your postcode</Text>
			<Button
				title="Submit"
				onPress={() => navigation.navigate("Create Profile")}
			></Button>
		</SafeAreaView>
	);
};

export default CreateProfile;
