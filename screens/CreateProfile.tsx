/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "react-native-gesture-handler";
import * as React from "react";
import firebase from "../config";
import "firebase/auth";
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
import { createUser } from "../utils";
import HomeScreen from "./HomeScreen";

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

const CreateProfile = ({ navigation, route }: any): JSX.Element => {
	const [bio, setBio] = React.useState("");
	const [skill, setSkill] = React.useState("");
	const [location, setLocation] = React.useState("");
	const [ageGroup, setAgeGroup] = React.useState("");
	const [availibility, setAvailibility] = React.useState([]);
	const [position, setSelectedPosition] = React.useState("");

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
					mode="dialog"
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
					selectedValue={skill}
					onValueChange={(itemValue, itemIndex) => setSkill(itemValue)}
				>
					<Picker.Item label="Beginner" value="Beginner" />
					<Picker.Item label="Not played in a while" value="GK" />
					<Picker.Item label="Not bad" value="Not bad" />
					<Picker.Item label="Semi-pro" value="Semi-pro" />
					<Picker.Item label="Pro" value="Pro" />
				</Picker>

				<Text style={styles.title}>Age Group:</Text>
				<Picker
					style={styles.input}
					selectedValue={ageGroup}
					onValueChange={(itemValue, itemIndex) => setAgeGroup(itemValue)}
				>
					<Picker.Item label="18-30" value="18-30" />
					<Picker.Item label="31-50" value="31-50" />
					<Picker.Item label="50+" value="50+" />
				</Picker>

				<Text style={styles.title}>Availability:</Text>

				{/* We may need to re-jig this so that everything before and after the SelectMultiple are saved to components so that it displays correctly on iOS. */}
				<View>
					<SelectMultiple
						items={timeSlots}
						selectedItems={availibility}
						onSelectionsChange={(
							availibility: React.SetStateAction<never[]>
						) => {
							setAvailibility(availibility);
						}}
					/>
				</View>

				<Text style={styles.title}>Add a profile picture!</Text>
				<Button
					title="Upload"
					onPress={() => navigation.navigate("CreateProfile")}
				/>
				<Button
					title="Submit"
					onPress={() => {
						createUser(
							route.params.firstName,
							route.params.lastName,
							route.params.email,
							route.params.username,
							location,
							position,
							skill,
							ageGroup,
							availibility,
							bio
						);
						navigation.navigate("HomeScreen");
					}}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default CreateProfile;
