/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "react-native-gesture-handler";
// import firebase from "../config.js";
import * as React from "react";
import {
	SafeAreaView,
	TextInput,
	Button,
	Text,
	ScrollView,
	View,
} from "react-native";
import styles from "../styles";
import { Picker } from "@react-native-picker/picker";
import SelectMultiple from "react-native-select-multiple";

// const ref = firebase.firestore().collection("users");
// const getAVailability = () =>
// 	ref.onSnapshot(({ docs }) => {
// 		docs.forEach((doc) => {
// 			console.log(doc.data().availability);
// 		});
// 	});

interface User {
	LastName: string;
	ageGroup: string;
	availability: any;
	bio: string;
	email: string;
	firstName: string;
	location: string;
	position: {
		DEF: boolean;
		GK: boolean;
		MID: boolean;
		ST: boolean;
		noPref: boolean;
	};
	profilePic?: boolean;
	skill: string;
	username: string;
}

const timeSlots = [
	"Monday AM",
	"Monday PM",
	"Tuesday AM",
	"Tuesday PM",
	"Wednesday AM",
	"Wednesday PM",
	"Thursday AM",
	"Thursday PM",
	"Friday AM",
	"Friday PM",
	"Saturday AM",
	"Saturday PM",
	"Sunday AM",
	"Sunday PM",
];

const CreateProfile = ({ navigation }: any): JSX.Element => {
	const [bio, setBio] = React.useState("");
	const [location, setLocation] = React.useState("");
	const [position, setSelectedPosition] = React.useState({
		noPref: false,
		GK: false,
		DEF: false,
		MID: false,
		FWD: false,
	});
	const [selectedTimes, setSelectedTimes] = React.useState([]);

	return (
		<SafeAreaView>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Text style={styles.title}>Bio:</Text>
				<TextInput
					style={styles.input}
					onChangeText={setBio}
					multiline={true}
					numberOfLines={4}
					value={bio}
					placeholder="   call me lionel"
				/>

				<Text style={styles.title}>Location:</Text>
				<TextInput
					style={styles.input}
					onChangeText={setLocation}
					value={location}
					placeholder="   e.g. L17, M15, SW1"
				/>

				<Text style={styles.title}>Position Preference</Text>
				<Picker
					style={styles.input}
					selectedValue={position}
					onValueChange={(itemValue, itemIndex) =>
						setSelectedPosition(itemValue)
					}
				>
					<Picker.Item label="No preference" value="No preference" />
					<Picker.Item label="GK" value="GK" />
					<Picker.Item label="DEF" value="DEF" />
					<Picker.Item label="MID" value="MID" />
					<Picker.Item label="FWD" value="FWD" />
				</Picker>

				<Text style={styles.title}>Skill Level</Text>
				<Picker
					style={styles.input}
					selectedValue={position}
					onValueChange={(itemValue, itemIndex) =>
						setSelectedPosition(itemValue)
					}
				>
					<Picker.Item label="Beginner" value="Beginner" />
					<Picker.Item label="Not played in a while" value="GK" />
					<Picker.Item label="Not bad" value="Not bad" />
					<Picker.Item label="Semi-pro" value="Semi-pro" />
					<Picker.Item label="Pro" value="Pro" />
				</Picker>

				<Text style={styles.title}>Availability:</Text>
				<View>
					<SelectMultiple
						items={timeSlots}
						selectedItems={selectedTimes}
						onSelectionsChange={(
							selectedTimes: React.SetStateAction<never[]>
						) => {
							setSelectedTimes(selectedTimes);
							console.log(selectedTimes);
						}}
					/>
				</View>

				<Text style={styles.title}>Add a profile picture!</Text>
				<Button
					title="Upload"
					onPress={() => navigation.navigate("Create Profile")}
				/>
				<Button
					title="Submit"
					onPress={() => navigation.navigate("Create Profile")}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default CreateProfile;
