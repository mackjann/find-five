/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useState, useEffect } from "react";
import { LogBox } from "react-native";
import "react-native-gesture-handler";
import * as postcodeData from "../data/outer-postcodes.json";
import MapView, { Marker, Callout } from "react-native-maps";
import {
	Text,
	SafeAreaView,
	ScrollView,
	StatusBar,
	TextInput,
	View,
	Image,
	TouchableOpacity,
} from "react-native";
import styles from "../styles.js";

import SelectMultiple from "react-native-select-multiple";

LogBox.ignoreLogs(["componentWillReceiveProps has been renamed"]);

const Search = ({ route, navigation }: any): JSX.Element => {
	const { users } = route.params;
	const { teams } = route.params;

	// console.log(users[6]);

	//postcode data
	const allOuterPostcodes = postcodeData.default;

	//adding lat and lng to user and team objects from the db, based on their postcodes
	const usersWithCoords = users.map((user) => {
		allOuterPostcodes.forEach((outerPostcode) => {
			if (outerPostcode.postcode == user.location) {
				user.lat = outerPostcode.latitude;
				user.lng = outerPostcode.longitude;
			}
		});
		return user;
	});

	const teamsWithCoords = teams.map((team) => {
		allOuterPostcodes.forEach((outerPostcode) => {
			if (outerPostcode.postcode == team.venueLocation) {
				team.lat = outerPostcode.latitude;
				team.lng = outerPostcode.longitude;
			}
		});
		return team;
	});

	// console.log(teamsWithCoords);
	//location is the postcode that user types in
	const [location, setLocation] = useState("");

	//coords are updated based on entered postcode location - the map re-centres to that postcode
	const [coords, setCoords] = useState({
		latitude: 53.47734,
		longitude: -2.23508,
		//delta bit is the zoom level
		latitudeDelta: 0.09,
		longitudeDelta: 0.09,
	});

	let lat = 0;
	let lng = 0;
	let latLng = {};

	useEffect(() => {
		allOuterPostcodes.forEach((outerPostcode) => {
			if (outerPostcode.postcode === location.toUpperCase()) {
				lat = outerPostcode.latitude;
				lng = outerPostcode.longitude;
				latLng = {
					latitude: lat,
					longitude: lng,
					latitudeDelta: 0.07,
					longitudeDelta: 0.07,
				};
				setCoords(latLng);
			}
		});
	}, [location]);

	//this is if we want to specify looking for teams or players only and not both like we are doing atm
	const searchOptions = ["Players", "Teams"];
	const [selectedOptions, setSelectedOptions] = useState([
		{
			label: "",
			value: "",
		},
		{
			label: "",
			value: "",
		},
	]);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Text style={styles.button_text}>⚽Search Teams & Players⚽</Text>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						justifyContent: "space-between",
						marginBottom: 10,
					}}
				>
					<Text style={[styles.title, { width: 140 }]}>
						{"Search area postcode:"}
					</Text>
					<TextInput
						style={styles.input}
						onChangeText={(text) => {
							setLocation(text);
						}}
						value={location}
						placeholder="e.g. L17, M15, SW1"
					/>
				</View>
				{/* this is if we want to specify looking for teams or players only and
				not both */}
				<View>
					<SelectMultiple
						style={{ position: "relative", left: 20 }}
						items={searchOptions}
						selectedItems={selectedOptions}
						onSelectionsChange={(selectedOptions: any) => {
							setSelectedOptions(selectedOptions);
							console.log(selectedOptions, "<< selected options");
						}}
					/>
				</View>
				{/* currently a redundant button
				<Button
					title="Search"
					onPress={() => navigation.navigate("Register")}
				/> */}
				<View
					style={[
						styles.container,
						{
							overflow: "hidden",
						},
						styles.map,
					]}
				>
					<MapView style={styles.map} region={coords}>
						{(selectedOptions[2] && selectedOptions[2].value === "Players") ||
						(selectedOptions[3] && selectedOptions[3].value === "Players")
							? usersWithCoords.map((user) => {
								return (
									<Marker
										key={user.username}
										coordinate={{
											latitude: user.lat,
											longitude: user.lng,
										}}
										pinColor="green"
									>
										<Image
											source={require("../assets/player-icon-1.png")}
											style={{ width: 20, height: 20 }}
											resizeMode="center"
										/>
										<Callout
											tooltip={false}
											// style={styles.customView}
											onPress={() =>
												navigation.navigate("PlayerProfile", {
													username: user.username,
													users: users,
												})
											}
										>
											<View>
												<Text style={styles.callout}>
													{"Name:\n"} {user.username}
												</Text>
												<Text style={styles.callout}>
													{"Skill level:\n"} {user.skill}
												</Text>
											</View>
										</Callout>
									</Marker>
								);
								// eslint-disable-next-line no-mixed-spaces-and-tabs
							  })
							: null}
						{(selectedOptions[2] && selectedOptions[2].value === "Teams") ||
						(selectedOptions[3] && selectedOptions[3].value === "Teams")
							? teamsWithCoords.map((team) => {
								return (
									<Marker
										key={team.teamName}
										coordinate={{
											latitude: team.lat,
											longitude: team.lng,
										}}
										pinColor="green"
									>
										<Image
											source={require("../assets/emblem.png")}
											style={{ width: 20, height: 20 }}
											resizeMode="center"
										/>
										<Callout
											tooltip={false}
											onPress={() =>
												navigation.navigate("ExternalTeam", {
													teamName: team.teamName,
													teams: teams,
												})
											}
										>
											<View>
												<Text style={styles.callout}>
													{"Name:\n"}
													{team.teamName}
												</Text>
												<Text style={styles.callout}>
														Venue: {team.venueLocation}
												</Text>
												<Text style={styles.callout}>
													{"Looking for:\n"}
													{team.lookingFor.DEF
														? "Defender"
														: team.lookingFor.GK
															? "Goalkeeper"
															: team.lookingFor.MID
																? "Midfielder"
																: team.lookingFor.ST
																	? "Striker"
																	: "Not currently looking"}
												</Text>
											</View>
										</Callout>
									</Marker>
								);
								// eslint-disable-next-line no-mixed-spaces-and-tabs
							  })
							: null}
					</MapView>
				</View>

				<TouchableOpacity
					style={[
						styles.button,
						{
							alignSelf: "center",
							borderColor: "black",
							borderWidth: 2,
							height: 35,
							borderRadius: 12,
						},
					]}
					onPress={() =>
						navigation.navigate("HomeScreen", { users: users, teams: teams })
					}
				>
					<Text
						style={[styles.button_text, { alignSelf: "center", fontSize: 18 }]}
					>
						Back to Home
					</Text>
				</TouchableOpacity>

				<StatusBar />
			</ScrollView>
		</SafeAreaView>
	);
};

export default Search;
