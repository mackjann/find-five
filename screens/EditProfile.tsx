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
import { createUser, editUserInfo } from "../utils";
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

const EditProfile = ({ navigation, route }: any): JSX.Element => {
	const { userState } = route.params;
	const userID: null | string = firebase.auth().currentUser.uid;

	const [bio, setBio] = React.useState(userState.bio);
	const [skill, setSkill] = React.useState(userState.skill);
	const [location, setLocation] = React.useState(userState.location);
	const [ageGroup, setAgeGroup] = React.useState(userState.ageGroup);
	const [availibility, setAvailibility] = React.useState(
		userState.availibility
	);
	const [position, setSelectedPosition] = React.useState(userState.position);

	return (
		<SafeAreaView style={styles.container}>
			<View
				style={{
					justifyContent: "flex-start",

					height: Dimensions.get("window").height * 0.12,
				}}
			>
				<Image
					style={{
						margin: 0,
						width: 50,
						top: -10,
					}}
					resizeMode={"contain"}
					source={require("../images/find5-icon-no-bg.png")}
					// source={require("../images/find5-2.png")}
				/>
			</View>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						justifyContent: "flex-start",
						marginBottom: 10,
					}}
				>
					<Text style={[styles.button_text, { margin: 20 }]}>
						{"Bio:         "}
					</Text>
					<TextInput
						style={[styles.input]}
						onChangeText={setBio}
						multiline={true}
						numberOfLines={4}
						value={bio}
						placeholder="  call me lionel"
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
					<Text style={[styles.button_text, { margin: 20 }]}>Location:</Text>
					<TextInput
						style={styles.input}
						onChangeText={setLocation}
						value={location}
						placeholder="e.g. L17, M15, SW1"
					/>
				</View>
				<Text style={[styles.button_text, { textAlign: "left" }]}>
					{"    Position Preference"}
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

				<Text style={[styles.button_text, { textAlign: "left" }]}>
					{"    Skill level"}
				</Text>
				<Picker
					style={[
						styles.button_text,
						{ margin: 50, borderWidth: 0.5, borderColor: "black" },
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

				<Text style={[styles.button_text, { textAlign: "left" }]}>
					{"    Age group:"}
				</Text>
				<Picker
					style={[
						styles.button_text,
						{ margin: 50, borderWidth: 0.5, borderColor: "black" },
					]}
					selectedValue={ageGroup}
					onValueChange={(itemValue, itemIndex) => {
						setAgeGroup(itemValue);
					}}
				>
					<Picker.Item label="18-30" value="18-30" />
					<Picker.Item label="31-50" value="31-50" />
					<Picker.Item label="50+" value="50+" />
				</Picker>

				<Text style={[styles.button_text, { textAlign: "left" }]}>
					{"Please select your new availability:"}
				</Text>
				<View>
					<Text style={{ margin: 5 }}>
						<Text style={{ fontWeight: "bold" }}>
							{"Your current availibility:\n"}
						</Text>
						{userState.availability.map((day) => {
							return <Text key={day.value}>{`${day.value}\n`}</Text>;
						})}
					</Text>
				</View>
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
				{/* 
				<Text style={styles.title}>Add a profile picture!</Text> */}
				{/* <Button
					title="Upload"
					onPress={() => navigation.navigate("CreateProfile")}
				/> */}

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
						editUserInfo(
							userID,
							location,
							position,
							skill,
							ageGroup,
							availibility,
							bio
						);
					}}
				>
					<Text
						style={[styles.button_text, { alignSelf: "center", fontSize: 18 }]}
					>
						Submit
					</Text>
				</TouchableOpacity>

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
						navigation.navigate("MyProfile");
					}}
				>
					<Text
						style={[styles.button_text, { alignSelf: "center", fontSize: 18 }]}
					>
						Navigate
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
};

export default EditProfile;
