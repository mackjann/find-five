/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "react-native-gesture-handler";
import * as React from "react";
import { SafeAreaView, TextInput, Button, Text } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import styles from "../styles";
import { Picker } from "@react-native-picker/picker";

const CreateProfile = ({ navigation }: any): JSX.Element => {
	const [location, onChangeLocation] = React.useState("");
	const [position, setSelectedPosition] = React.useState({
		noPref: false,
		GK: false,
		DEF: false,
		MID: false,
		FWD: false,
	});

	return (
		<SafeAreaView>
			<Text>Please provide only the first 3 letters of your postcode</Text>
			<TextInput
				style={styles.input}
				onChangeText={onChangeLocation}
				value={location}
				placeholder="Your location"
			/>
			<Text>Position Preference</Text>
			{/* <Picker
				selectedValue={position}
				onValueChange={(itemValue, itemIndex) => setSelectedPosition(itemValue)}
			>
				<Picker.Item label="No preference" value="No preference" />
				<Picker.Item label="GK" value="GK" />
				<Picker.Item label="DEF" value="DEF" />
				<Picker.Item label="MID" value="MID" />
				<Picker.Item label="FWD" value="FWD" />
			</Picker> */}
			<BouncyCheckbox
				onPress={() => {
					(isChecked: boolean) => {
						if (isChecked === true) {
							setSelectedPosition({
								noPref: true,
								GK: false,
								DEF: false,
								MID: false,
								FWD: false,
							});
						}
					};
				}}
				size={25}
				fillColor="red"
				unfillColor="#FFFFFF"
				text="No Preference"
				iconStyle={{ borderColor: "red" }}
			/>
			<Text>Skill Level</Text>
			<Picker
				selectedValue={position}
				onValueChange={(itemValue, itemIndex) => setSelectedPosition(itemValue)}
			>
				<Picker.Item label="No preference" value="No preference" />
				<Picker.Item label="GK" value="GK" />
				<Picker.Item label="DEF" value="DEF" />
				<Picker.Item label="MID" value="MID" />
				<Picker.Item label="FWD" value="FWD" />
			</Picker>
			<Button
				title="Submit"
				onPress={() => navigation.navigate("Create Profile")}
			></Button>
		</SafeAreaView>
	);
};

export default CreateProfile;
