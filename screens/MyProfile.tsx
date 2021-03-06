/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { LogBox } from "react-native";
import "react-native-gesture-handler";
// import BouncyCheckbox from "react-native-bouncy-checkbox";
import {
	Text,
	View,
	SafeAreaView,
	ScrollView,
	Button,
	StatusBar,
	TouchableOpacity,
	Image,
	FlatList,
} from "react-native";
import styles from "../styles.js";
import firebase from "../config.js";
import "firebase/auth";
import { useState, useEffect } from "react";
import SelectMultiple from "react-native-select-multiple";
import { useCardAnimation } from "@react-navigation/stack";
import {
	acceptInvite,
	declineInvite,
	getUsersRequests,
	getUsersTeams,
} from "../utils";

LogBox.ignoreLogs(["Setting a timer for a long period"]);
LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
LogBox.ignoreLogs(["VirtualizedList: missing keys for items"]);
LogBox.ignoreLogs([
	"Can't perform a React state update on an unmounted component",
]);
// LogBox.ignoreLogs(["Possible Unhandled Promise Rejection (id: 19):"]);
LogBox.ignoreLogs(["Possible Unhandled Promise Rejection"]);

// const getEmail = () =>
// 	ref.onSnapshot(({ docs }) => {
// 		docs.forEach((doc) => {
// 			console.log(doc.data().username);
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
	position: string;
	profilePic: string;
	skill: string;
	username: string;
	memberOf: any;
}

const MyProfile = ({ navigation }: any): JSX.Element => {
	const userID: null | string = firebase.auth().currentUser.uid;
	const ref = firebase.firestore().collection("users");
	// console.log(userID);

	const [userState, setUserState] = useState({
		LastName: "",
		ageGroup: "",
		availability: [{ label: "day", value: "day" }],
		bio: "",
		email: "",
		firstName: "",
		location: "",
		position: "",
		profilePic: "",
		skill: "",
		username: "",
		memberOf: [],
	});

	const [teamsList, setTeamsList] = React.useState([]);

	const [isLoading, setIsLoading] = React.useState(true);
	const [hasRequests, setHasRequests] = React.useState(false);
	const [requestsArr, setRequestsArr] = React.useState([]);

	const user = async () => {
		const userData = await ref.doc(userID).get();
		const userProfile = userData.data();
		// console.log(userProfile);
		return userProfile;
	};

	useEffect(() => {
		getUsersRequests(userID).then((res) => {
			setRequestsArr(res);
		});
		user()
			.then((results) => {
				setUserState(results);
			})
			.then(() => {
				if (userState.requests.length > 0) {
					setHasRequests(true);
				}
			});
		getUsersTeams(userID).then((res) => {
			setTeamsList(res);
		});
		setIsLoading(!isLoading);
	}, [userState.requests]);

	console.log(userState.requests, "<==== requests");
	console.log(hasRequests, "<==== hasReq?");

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						justifyContent: "center",
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
						source={require("../images/find5-icon-no-bg.png")}
					/>
					<Text style={styles.button_text}>
						{` Hi ${userState.firstName} (${userState.username}) `}{" "}
					</Text>
				</View>

				<Image
					style={{
						marginBottom: 0,
						alignSelf: "center",
					}}
					fadeDuration={1500}
					resizeMode={"cover"}
					borderRadius={70}
					source={{
						width: 140,
						height: 140,
						uri: userState.profilePic,
					}}
				/>
				<View
					style={{
						width: 290,
						backgroundColor: "rgba(250,250,250, 0.5)",
						borderRadius: 10,
						alignSelf: "center",
						padding: 10,
						margin: 15,

						// height: Dimensions.get("window").height * 0.15,
					}}
				>
					<Text style={{ margin: 5 }}>
						<Text style={{ fontWeight: "bold" }}>{"About me:\n"}</Text>
						{`"${userState.bio}"`}
					</Text>
					<Text style={{ margin: 5 }}>
						<Text style={{ fontWeight: "bold" }}>My location:</Text>
						{` ${userState.location}`}
					</Text>
					<Text style={{ margin: 5 }}>
						<Text style={{ fontWeight: "bold" }}>Preferred position:</Text>
						{` ${userState.position}`}
					</Text>
					<Text style={{ margin: 5 }}>
						<Text style={{ fontWeight: "bold" }}>Skill level:</Text>
						{` ${userState.skill}`}
					</Text>
					<Text style={{ margin: 5 }}>
						<Text style={{ fontWeight: "bold" }}>{"My availability:\n"}</Text>
						{userState.availability.map((day) => {
							return <Text key={day.value}>{`- ${day.value}\n`}</Text>;
						})}
					</Text>
					<Text style={{ margin: 5 }}>
						<Text style={{ fontWeight: "bold" }}>{"My teams:"}</Text>
						{/* {teamsList.map((team) => {
							return (
								<Text
									key={team.teamName}
								>{`Name: ${team.teamName}\n pic: ${team.pic}\n location: ${team.location}`}</Text>
							);
						})} */}
					</Text>

					<View>
						{teamsList.map((team) => {
							return (
								<View
									key={team.teamName}
									style={{
										flexDirection: "row",
										justifyContent: "space-between",
										alignItems: "flex-start",
										width: 270,
										height: 65,
										backgroundColor: "rgba(250,250,250, 0.7)",
										borderRadius: 2,
										alignSelf: "center",
										padding: 10,
										margin: 10,
									}}
								>
									<View
										style={{
											marginRight: 5,
										}}
									>
										<Image
											style={{
												alignSelf: "center",
												marginBottom: 6,
											}}
											resizeMode={"cover"}
											source={{
												width: 45,
												height: 45,
												uri: team.pic,
											}}
										/>
									</View>
									<View
										style={{
											justifyContent: "flex-start",
											alignItems: "flex-start",
											flexDirection: "column",
										}}
									>
										<View
											style={{
												flexDirection: "column",
												alignItems: "flex-start",
												paddingBottom: 2,
												margin: 1,
												borderBottomWidth: 1,
												borderBottomColor: "grey",
												width: 150,
											}}
										>
											<Text
												style={{
													fontWeight: "bold",
													fontSize: 16,
													textTransform: "capitalize",
												}}
											>{`${team.teamName}`}</Text>
										</View>
										<Text style={{ margin: 1 }}>
											<Text style={{ fontWeight: "bold" }}>{"Location:"}</Text>
											{` ${team.location}`}
										</Text>
									</View>
									{/* <View
										style={{
											width: 20,
										}}
									></View> */}

									<View
										style={{ flexDirection: "row", alignItems: "flex-start" }}
									>
										<TouchableOpacity
											style={[
												styles.small_button,
												{
													borderWidth: 0.5,
													height: 46,
													borderRadius: 5,
													width: 50,
													margin: 3,
													marginTop: 0,
												},
											]}
											onPress={() =>
												navigation.navigate("MyTeamProfile", {
													teamID: team.id,
												})
											}
										>
											<Text
												style={[
													styles.button_text,
													{ alignSelf: "center", fontSize: 14 },
												]}
											>
												{"Team\npage"}
											</Text>
										</TouchableOpacity>

										{/* <TouchableOpacity
										style={[
											styles.small_button,
											{
												borderWidth: 0.5,
												height: 46,
												borderRadius: 5,
												width: 55,
												margin: 3,
												marginTop: 0,
											},
										]}
									>
										<Text
											style={[
												styles.button_text,
												{ alignSelf: "center", fontSize: 14 },
											]}
										>
											{`Leave\nteam`}
										</Text>
									</TouchableOpacity> */}
									</View>
								</View>
							);
						})}
					</View>
					{hasRequests ? (
						<View>
							<Text style={{ margin: 5 }}>
								<Text style={{ fontWeight: "bold" }}>{"Requests:"}</Text>
							</Text>
							<View>
								{requestsArr.map((team) => {
									return (
										<View
											key={team.teamName}
											style={{
												flexDirection: "row",
												justifyContent: "space-between",
												alignItems: "flex-start",
												width: 270,
												height: 65,
												backgroundColor: "rgba(250,250,250, 0.7)",
												borderRadius: 2,
												alignSelf: "center",
												padding: 10,
												margin: 10,
											}}
										>
											<View
												style={{
													marginRight: 5,
												}}
											>
												<Image
													style={{
														alignSelf: "center",
														marginBottom: 6,
													}}
													resizeMode={"cover"}
													source={{
														width: 45,
														height: 45,
														uri: team.pic,
													}}
												/>
											</View>
											<View
												style={{
													justifyContent: "flex-start",
													alignItems: "flex-start",
													flexDirection: "column",
													width: 150,
												}}
											>
												<View
													style={{
														flexDirection: "column",
														alignItems: "flex-start",
														paddingBottom: 2,
														margin: 1,
														borderBottomWidth: 1,
														borderBottomColor: "grey",
													}}
												>
													<Text
														style={{
															fontWeight: "bold",
															fontSize: 16,
															textTransform: "capitalize",
														}}
													>{`${team.teamName}`}</Text>
												</View>
												<Text style={{ margin: 1 }}>
													<Text style={{ fontWeight: "bold" }}>
														{"Location:"}
													</Text>
													{` ${team.location}`}
												</Text>
											</View>
											{/* <View
												style={{
													width: 20,
												}}
											></View> */}

											<View
												style={{
													flexDirection: "row",
													alignItems: "flex-start",
												}}
											>
												<TouchableOpacity
													style={[
														styles.small_button,
														{
															borderWidth: 0.5,
															height: 20,
															borderRadius: 5,
															width: 20,
															margin: 3,
															marginTop: 0,
														},
													]}
													onPress={() => {
														acceptInvite(team.id, userID);
														console.log("accepted invite");
													}}
												>
													<Text
														style={[
															styles.button_text,
															{ alignSelf: "center", fontSize: 14 },
														]}
													>
														{"???"}
													</Text>
												</TouchableOpacity>
												<TouchableOpacity
													style={[
														styles.small_button,
														{
															borderWidth: 0.5,
															height: 20,
															borderRadius: 5,
															width: 20,
															margin: 3,
															marginTop: 0,
														},
													]}
													onPress={() => declineInvite(team.id, userID)}
												>
													<Text
														style={[
															styles.button_text,
															{ alignSelf: "center", fontSize: 14 },
														]}
													>
														{"???"}
													</Text>
												</TouchableOpacity>

												{/* <TouchableOpacity
										style={[
											styles.small_button,
											{
												borderWidth: 0.5,
												height: 46,
												borderRadius: 5,
												width: 55,
												margin: 3,
												marginTop: 0,
											},
										]}
									>
										<Text
											style={[
												styles.button_text,
												{ alignSelf: "center", fontSize: 14 },
											]}
										>
											{`Leave\nteam`}
										</Text>
									</TouchableOpacity> */}
											</View>
										</View>
									);
								})}
							</View>
						</View>
					) : (
						<Text>No requests :(</Text>
					)}
				</View>

				<TouchableOpacity
					style={[
						styles.button,
						{
							alignSelf: "center",
							borderColor: "black",
							borderWidth: 0.5,
							height: 35,
							borderRadius: 12,
							position: "relative",
							width: 140,
							bottom: -2,
						},
					]}
					onPress={() =>
						navigation.navigate("EditProfile", { userState: userState })
					}
				>
					<Text
						style={[styles.button_text, { alignSelf: "center", fontSize: 18 }]}
					>
						Edit my profile
					</Text>
				</TouchableOpacity>

				<StatusBar />
			</ScrollView>
		</SafeAreaView>
	);
};

export default MyProfile;
