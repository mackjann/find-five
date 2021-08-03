/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useState, useEffect } from "react";
import { LogBox } from "react-native";
import "react-native-gesture-handler";
import * as postcodeData from "../data/outer-postcodes.json";
import MapView, { Marker, Callout } from "react-native-maps";
import { Svg, Image as ImageSvg } from "react-native-svg";
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
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						justifyContent: "space-evenly",
						marginBottom: 10,
						width: 280,
						height: 55,
					}}
				>
					<Image
						style={{
							margin: 0,
							// alignSelf: "center",
							width: 40,
							top: -12,
						}}
						resizeMode={"contain"}
						source={require("../images/find5-icon.png")}
						// source={require("../images/find5-2.png")}
					/>
					<Text style={styles.button_text}>Search Teams & Players</Text>
				</View>
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
						style={[styles.input]}
						onChangeText={(text) => {
							setLocation(text);
						}}
						value={location}
						placeholder="e.g. L17, M15, SW1"
					/>
				</View>

				{/* Options to specify looking for teams or players or both */}

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

				{/* This is me trying to pre-load photos to make sure they appear on the callouts without a delay - can't make it work atm.
							Both player and team avatars are hard-coded at the moment */}
				<Svg width={0} height={0}>
					<ImageSvg
						width={"100%"}
						height={"100%"}
						preserveAspectRatio="xMidYMid slice"
						href={{
							uri: "https://logos-world.net/wp-content/uploads/2020/06/England-logo.png",
						}}
					/>
				</Svg>
				<Svg width={0} height={0}>
					<ImageSvg
						width={"100%"}
						height={"100%"}
						preserveAspectRatio="xMidYMid slice"
						href={{
							uri: "https://i2-prod.manchestereveningnews.co.uk/incoming/article19885916.ece/ALTERNATES/s1200c/0_GettyImages-1231312492.jpg",
						}}
					/>
				</Svg>

				<View
					style={[
						styles.container,
						// {
						// 	overflow: "hidden",
						// },
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
												style={{
													marginTop: 0,
													width: 25,
													height: 25,
													alignSelf: "flex-end",
												}}
												resizeMode="contain"
											/>
											<Callout
												tooltip
												onPress={() =>
													navigation.navigate("PlayerProfile", {
														username: user.username,
														users: users,
													})
												}
											>
												<View style={styles.bubble}>
													<Text style={styles.callout}>{user.username}</Text>

													<Svg
														width={40}
														height={40}
														style={{ alignSelf: "center" }}
													>
														<ImageSvg
															width={"100%"}
															height={"100%"}
															preserveAspectRatio="xMidYMid slice"
															href={{
																uri: "https://i2-prod.manchestereveningnews.co.uk/incoming/article19885916.ece/ALTERNATES/s1200c/0_GettyImages-1231312492.jpg",
															}}
														/>
													</Svg>

													<Text style={styles.callout}>
														{"Level:"} {user.skill}
													</Text>
												</View>
												<View style={styles.arrowBorder} />
												<View style={styles.arrow} />
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
												style={{ width: 25, height: 25 }}
												resizeMode="center"
											/>
											<Callout
												tooltip
												onPress={() =>
													navigation.navigate("ExternalTeam", {
														teamName: team.teamName,
														teams: teams,
													})
												}
											>
												<View>
													<View style={styles.bubble}>
														<Text style={styles.callout}>{team.teamName}</Text>
														<Svg
															width={40}
															height={40}
															style={{ alignSelf: "center" }}
														>
															<ImageSvg
																width={"100%"}
																height={"100%"}
																preserveAspectRatio="xMidYMid slice"
																href={{
																	uri: "https://logos-world.net/wp-content/uploads/2020/06/England-logo.png",
																}}
															/>
														</Svg>
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
												</View>

												<View style={styles.arrowBorder} />
												<View style={styles.arrow} />
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
							width: 150,
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
