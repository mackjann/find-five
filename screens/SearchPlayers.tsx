/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useState, useEffect } from "react";
import "react-native-gesture-handler";
import * as postcodeData from "../data/outer-postcodes.json";
import MapView, { Marker, Callout } from "react-native-maps";
import {
	Text,
	SafeAreaView,
	ScrollView,
	Button,
	StatusBar,
	TextInput,
	View,
	Image,
} from "react-native";
import styles from "../styles.js";

import SelectMultiple from "react-native-select-multiple";

const Search = ({ route, navigation }: any): JSX.Element => {
	const { users } = route.params;
	const { teams } = route.params;

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

	console.log(teamsWithCoords);
	//location is the postcode that user types in
	const [location, setLocation] = useState("");

	//coords are updated based on entered postcode location - the map re-centres to that postcode
	const [coords, setCoords] = useState({
		latitude: 53.47734,
		longitude: -2.23508,
		//delta bit is the zoom level
		latitudeDelta: 0.07,
		longitudeDelta: 0.07,
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
	const searchOptions = ["Teams", "Players"];
	const [selectedOptions, setSelectedOptions] = useState([]);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Text
					style={{
						textAlign: "center",
						fontWeight: "bold",
						fontSize: 18,
						marginTop: 30,
						marginBottom: 10,
						width: 300,
					}}
				>
					Search for Teams & Players
				</Text>
				<Text style={styles.title}>
					{"Please enter first part of postcode for search area:"}
				</Text>
				<TextInput
					style={styles.input}
					onChangeText={(text) => {
						setLocation(text);
					}}
					value={location}
					placeholder="   e.g. L17, M15, SW1"
				/>
				{/* this is if we want to specify looking for teams or players only and
				not both */}
				<View>
					<SelectMultiple
						items={searchOptions}
						selectedItems={selectedOptions}
						onSelectionsChange={(selectedOptions: any) => {
							setSelectedOptions(selectedOptions);
						}}
					/>
				</View>
				{/* currently a redundant button
				<Button
					title="Search"
					onPress={() => navigation.navigate("Register")}
				/> */}
				<View style={styles.container}>
					<MapView style={styles.map} region={coords}>
						{usersWithCoords.map((user) => {
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
									<Callout>
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
						})}

						{teamsWithCoords.map((team) => {
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
									<Callout>
										<View>
											<Text style={styles.callout}>Name: {team.teamName}</Text>
											<Text style={styles.callout}>
												Venue: {team.venueLocation}{" "}
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
						})}
					</MapView>
				</View>
				<Button
					title="My Profile (or back to home page?)"
					onPress={() => navigation.navigate("MyProfile")}
				/>
				<StatusBar />
			</ScrollView>
		</SafeAreaView>
	);
};

export default Search;
