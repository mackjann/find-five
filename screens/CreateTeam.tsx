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
	TouchableOpacity,
	Dimensions,
	Image,
} from "react-native";
import styles from "../styles";
import { Picker } from "@react-native-picker/picker";
import SelectMultiple from "react-native-select-multiple";
import { addPlayer, createTeam } from "../utils";
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
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
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
							width: 80,
							top: -60,
						}}
						resizeMode={"contain"}
						source={require("../images/find5-1-no-bg.png")}
						// source={require("../images/find5-2.png")}
					/>
				</View>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						justifyContent: "flex-start",
						marginBottom: 10,
					}}
				>
					<Text style={[styles.button_text, { margin: 20 }]}>Team name:</Text>
					<TextInput
						style={styles.input}
						onChangeText={setteamName}
						multiline={true}
						numberOfLines={4}
						value={teamName}
						placeholder="e.g. The Big Chungi"
					/>
				</View>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						justifyContent: "flex-start",
						marginBottom: 10,
					}}
				>
					<Text style={[styles.button_text, { margin: 20 }]}>{"Bio:    "}</Text>

					<TextInput
						style={[styles.input, { width: 200 }]}
						onChangeText={setBio}
						multiline={true}
						numberOfLines={4}
						value={bio}
						placeholder="e.g. We gon have a good time"
					/>
				</View>

				{/* Picker component to choose competitiveness */}
				<Text style={[styles.button_text, { textAlign: "left" }]}>
					{"    How competitive are you?"}
				</Text>
				<Picker
					mode="dialog"
					style={[
						styles.button_text,
						{
							margin: 50,
							borderWidth: 0.5,
							borderColor: "black",
						},
					]}
					selectedValue={purpose}
					onValueChange={(itemValue, itemIndex) => setPurpose(itemValue)}
				>
					<Picker.Item label="Just for fun" value="Just for fun" />
					<Picker.Item label="Competitive" value="Competitive" />
				</Picker>

				{/* Picker component to choose skill level */}
				<Text style={[styles.button_text, { textAlign: "left" }]}>
					{"    Skill level:"}
				</Text>
				<Picker
					mode="dialog"
					style={[
						styles.button_text,
						{
							margin: 50,
							borderWidth: 0.5,
							borderColor: "black",
						},
					]}
					selectedValue={skill}
					onValueChange={(itemValue, itemIndex) => setSkill(itemValue)}
				>
					<Picker.Item label="Beginner" value="Beginner" />
					<Picker.Item label="Not played in a while" value="GK" />
					<Picker.Item label="Not bad" value="Not bad" />
					<Picker.Item label="Semi-pro" value="Semi-pro" />
					<Picker.Item label="Pro" value="Pro" />
				</Picker>

				<View
					style={{
						flex: 1,
						flexDirection: "row",
						justifyContent: "flex-start",
						marginBottom: 10,
					}}
				>
					<Text style={[styles.button_text, { margin: 20 }]}>{"Venue:"}</Text>
					<TextInput
						style={[styles.input, { width: 180 }]}
						onChangeText={setVenue}
						value={venue}
						placeholder="e.g. Powerleague Ardwick"
					/>
				</View>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						justifyContent: "flex-start",
						marginBottom: 10,
					}}
				>
					<Text style={[styles.button_text, { margin: 20 }]}>
						{"Venue location:"}
					</Text>
					<TextInput
						style={[styles.input, { width: 105 }]}
						onChangeText={setVenueLocation}
						value={venueLocation}
						placeholder="e.g. M12"
					/>
				</View>
				<Text style={[styles.button_text, { textAlign: "left" }]}>
					{"    Looking for:"}
				</Text>

				<View>
					<SelectMultiple
						items={positions}
						selectedItems={lookingFor}
						onSelectionsChange={(lookingFor: React.SetStateAction<never[]>) => {
							setLookingFor(lookingFor);
						}}
					/>
				</View>
				<Text style={[styles.button_text, { textAlign: "left" }]}>
					{"    Availability:"}
				</Text>
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
						navigation.navigate("MyTeams");
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
						navigation.navigate("MyTeams");
					}}
				/> */}
			</ScrollView>
		</SafeAreaView>
	);
};

export default CreateProfile;
