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
import { createTeam } from "../utils";
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

const positions = ["GK", "DEF", "MID", "FWD"];

const CreateProfile = ({ navigation }: any): JSX.Element => {
	const userID = firebase.auth().currentUser.uid;
	const [teamName, setteamName] = React.useState("");
	const [bio, setBio] = React.useState("");
	const [venue, setVenue] = React.useState("");
	const [venueLocation, setVenueLocation] = React.useState("");
	const [purpose, setPurpose] = React.useState("");
	const [skill, setSkill] = React.useState("");
	const [lookingFor, setLookingFor] = React.useState([]);
	const [availability, setAvailability] = React.useState([]);

	return (
		<SafeAreaView>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Text style={styles.title}>Team Name:</Text>
				<TextInput
					style={styles.input}
					onChangeText={setteamName}
					multiline={true}
					numberOfLines={4}
					value={teamName}
					placeholder="e.g. The Big Chungi"
				/>

				<Text style={styles.title}>Bio:</Text>
				<TextInput
					style={styles.input}
					onChangeText={setBio}
					multiline={true}
					numberOfLines={4}
					value={bio}
					placeholder="e.g. We gon have a good time"
				/>

				{/* Picker component to choose competitiveness */}
				<Text style={styles.title}>How competetive are you?:</Text>
				<Picker
					mode="dialog"
					style={styles.input}
					selectedValue={purpose}
					onValueChange={(itemValue, itemIndex) => setPurpose(itemValue)}
				>
					<Picker.Item label="Just for fun" value="Just for fun" />
					<Picker.Item label="Competetive" value="Competetive" />
				</Picker>

				{/* Picker component to choose skill level */}
				<Text style={styles.title}>Skill level:</Text>
				<Picker
					mode="dialog"
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

				<Text style={styles.title}>Venue:</Text>
				<TextInput
					style={styles.input}
					onChangeText={setVenue}
					value={venue}
					placeholder="e.g. Powerleague Ardwick"
				/>

				<Text style={styles.title}>Venue:</Text>
				<TextInput
					style={styles.input}
					onChangeText={setVenueLocation}
					value={venueLocation}
					placeholder="e.g. M12"
				/>

				<Text style={styles.title}>Looking for:</Text>

				<View>
					<SelectMultiple
						items={positions}
						selectedItems={lookingFor}
						onSelectionsChange={(lookingFor: React.SetStateAction<never[]>) => {
							setLookingFor(lookingFor);
						}}
					/>
				</View>

				<Text style={styles.title}>Availability:</Text>
				<View>
					<SelectMultiple
						items={timeSlots}
						selectedItems={availability}
						onSelectionsChange={(
							availability: React.SetStateAction<never[]>
						) => {
							setAvailability(availability);
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
						createTeam(
							teamName,
							bio,
							purpose,
							venue,
							venueLocation,
							lookingFor,
							userID,
							availability
						);
						navigation.navigate("HomeScreen");
					}}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default CreateProfile;
