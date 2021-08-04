/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import firebase from "./config";
import "firebase/storage";
import "firebase/auth";

// createTeam(
// 	"testTeam",
// 	"Media city",
// 	"M50",
// 	{ DEF: false, FWD: false, GK: true, MID: false },
// 	"bOSaJWcrAvPqJFvv4mAM3anQ5Wb2",
// 	{
// 		fridayAM: true,
// 		fridayPM: true,
// 		mondayAM: true,
// 		mondayPM: true,
// 		saturdayAM: true,
// 		saturdayPM: true,
// 		sundayAM: true,
// 		sundayPM: true,
// 		thursdayAM: true,
// 		thursdayPM: true,
// 		tuesdayAM: true,
// 		tuesdayPM: true,
// 		wednesdayAM: true,
// 		wednesdayPM: true,
// 	}
// );

// initialize cloud firestore via firebase
const db = firebase.firestore();

// get reference to storage service
const storageRef = firebase.storage().ref();

// /Users/khizariqbal/Desktop
export const createTeam = (
	teamName,
	bio,
	purpose,
	venue,
	venueLocation,
	lookingFor,
	admin,
	availability
) => {
	db.collection("teams")
		.add({
			admin: admin,
			availability: availability,
			bio: bio,
			purpose: purpose,
			lookingFor: lookingFor,
			teamName: teamName,
			teamPic: true,
			venue: venue,
			venueLocation: venueLocation,
		})
		.then((docRef) => {
			const data = {
				members: [{ id: admin, hasAccepted: true }],
			};
			db.collection(`teams/${docRef.id}/members`).doc("membersArray").set(data);
		})
		.then(() => console.log("team saved to DB"))
		.catch((err) => console.log("BRUHH:", err));
};

export const createUser = async (
	firstName,
	lastName,
	email,
	username,
	location,
	position,
	skill,
	ageGroup,
	availability,
	bio
) => {
	const userID = firebase.auth().currentUser.uid;

	await db
		.collection("users")
		.doc(userID)
		.set({
			ageGroup: ageGroup,
			availability: availability,
			bio: bio,
			email: email,
			firstName: firstName,
			lastName: lastName,
			location: location,
			position: position,
			profilePic:
				"https://img.a.transfermarkt.technology/portrait/big/258923-1565603308.png?lm=1",
			skill: skill,
			username: username,
			memberOf: [],
			requests: [],
		})
		.then((newUser) => {
			console.log(newUser);
		})
		.catch((err) => {
			console.log("BRUH:", err);
		});
};

// 1. Grabs members array from team to add too
export const addPlayer = async (teamId, userId) => {
	const members = await db
		.collection(`teams/${teamId}/members`)
		.doc("membersArray")
		.get()
		.then((membersArr) => {
			return membersArr.data().members;
		})

		.catch((err) => {
			console.log(err);
		});

	// 2. Places grabbed user into members array with new key of "hasAccepted"
	const placePlayer = (members) => {
		db.collection(`teams/${teamId}/members`)
			.doc("membersArray")
			.set(
				{
					members: [...members, { id: userId, hasAccepted: false }],
				},
				{ merge: true }
			)
			.then(() => {
				console.log("player added");
			})
			.catch((err) => {
				console.log(err);
			});
	};
	placePlayer(members); // (Step 3 invoked here after user and members array have been grabbed)

	// 3. Grabs user doc of user we want to add to members array

	const playerDataRef = await db.collection("users").doc(userId).get();
	const playerData = playerDataRef.data();
	const userRequest = playerData.requests;

	// 4. Adds new key of "requests" (or spreads in new requests) to user that was placed in members array
	db.collection("users")
		.doc(userId)
		.set(
			{
				requests: [...userRequest, teamId],
			},
			{ merge: true }
		);
};

// Search users by username only (all usernames must be lowercase in order for this to work)
// This is an async function, will return a promise of userObj, not userObj itself. Use a .then
export const getUser = async (searchQuery) => {
	//const lcQuery = searchQuery.toLowerCase();
	const usersRef = await db.collection("users");
	const data = await usersRef.where("username", "==", searchQuery).get();
	if (data.empty) {
		return null;
	}
	const userObj = {};
	data.forEach((user) => {
		userObj[user.id] = user.data();
	});

	return userObj;
};

// export const getUserById = async (userId) => {
// 	const user = await db
// 		.collection("users")
// 		.doc(userId)
// 		.get()
// 		.then((res) => {
// 			return res.data();
// 		});
// 	return user;
// };

// can be one or more teams
// can search by any field/key in teams object
export const getTeam = async (searchTerm, field) => {
	// let cleanSearchTerm = "";
	// if (searchTerm.length > 3) {
	// 	cleanSearchTerm = searchTerm.toLowerCase();
	// } else {
	// 	cleanSearchTerm = searchTerm.toUpperCase();
	// }
	const teamsRef = db.collection("teams");
	const data = await teamsRef.where(field, "==", searchTerm).get();
	if (data.empty) {
		return null;
	}
	const teamsArr = [];
	data.forEach((team) => {
		const obj = { [team.id]: team.data() };
		teamsArr.push(obj);
	});
	return teamsArr;
};

// Removes user doc from db
export const deleteUser = (userId) => {
	db.collection("users")
		.doc(userId)
		.delete()
		.then(() => {
			console.log("user deleted");
		});
};

export const removeTeamMember = async (teamId, playerId) => {
	const members = await db
		.collection(`teams/${teamId}/members`)
		.doc("membersArray")
		.get()
		.then((membersArr) => {
			return membersArr.data().members;
		})

		.catch((err) => {
			console.log(err);
		});

	const ammendedMembers = members.filter((member) => !member[playerId]);
	console.log(ammendedMembers);

	db.collection(`teams/${teamId}/members`)
		.doc("membersArray")
		.set(
			{
				members: [...ammendedMembers],
			},
			{ merge: true }
		)
		.then(() => {
			console.log("player deleted");
		})
		.catch((err) => {
			console.log(err);
		});
};

export const deleteTeam = (teamId) => {
	db.collection(`teams/${teamId}/members`)
		.doc("membersArray")
		.delete()
		.then(() => {
			console.log("memberArr deleted");
		});
	db.collection("teams")
		.doc(teamId)
		.delete()
		.then(() => {
			console.log("team deleted");
		})
		.catch((err) => {
			console.log("BRUH -->", err);
		});
};

export const editUserInfo = async (
	userId,
	location,
	position,
	skill,
	ageGroup,
	availability,
	bio
) => {
	try {
		const userData = await db.collection("users").doc(userId).set(
			{
				location: location,
				position: position,
				skill: skill,
				ageGroup: ageGroup,
				availability: availability,
				bio: bio,
			},
			{ merge: true }
		);
	} catch (err) {
		console.log(err);
	}
};

export const editTeamInfo = async (teamId, field, input) => {
	try {
		const teamData = await db
			.collection("teams")
			.doc(teamId)
			.set(
				{
					[field]: input,
				},
				{ merge: true }
			);
	} catch (err) {
		console.log(err);
	}
};

export const acceptInvite = async (teamId, userId) => {
	const membersArrRef = await db
		.collection(`teams/${teamId}/members`)
		.doc("membersArray")
		.get();

	const membersArray = membersArrRef.data().members;
	let count = -1;
	const acceptedPlayer = membersArray.filter((member, index) => {
		count++;
		if (member[userId]) {
			return index;
		}
	});

	membersArray[count].hasAccepted = true;

	db.collection(`teams/${teamId}/members`).doc("membersArray").set(
		{
			members: membersArray,
		},
		{ merge: true }
	);

	const userRef = await db.collection("users").doc(userId).get();
	const requestsArr = userRef.data().requests;

	const newRequestsArr = requestsArr.filter((request) => request !== teamId);

	const memberOfArr = userRef.data().memberOf;

	db.collection("users")
		.doc(userId)
		.set(
			{
				requests: newRequestsArr,
				memberOf: [...memberOfArr, teamId],
			},
			{ merge: true }
		);
};

export const declineInvite = async (teamId, userId) => {
	const memberArrRef = await db
		.collection(`teams/${teamId}/members`)
		.doc("membersArray")
		.get();

	const membersArray = memberArrRef.data().members;

	const newMembersArr = membersArray.filter((member) => member.id !== userId);

	db.collection(`teams/${teamId}/members`).doc("membersArray").set(
		{
			members: newMembersArr,
		},
		{ merge: true }
	);

	const requestsArrRef = await db.collection("users").doc(userId).get();
	const requestsArr = requestsArrRef.data().requests;

	const newRequestsArr = requestsArr.filter((request) => request !== teamId);

	db.collection("users").doc(userId).set(
		{
			requests: newRequestsArr,
		},
		{ merge: true }
	);
};

export const getMembersOfTeam = async (teamId) => {
	const membersRef = await db
		.collection(`teams/${teamId}/members`)
		.doc("membersArray")
		.get();

	// gets members array from teams sub-collection
	const membersArr = await membersRef.data().members;
	const membersId = membersArr.map((member) => member.id);
	// console.log(membersId);

	const allUsers = await db.collection("users").get();
	const membersInfo = [];
	allUsers.forEach((user) => {
		if (membersId.includes(user.id)) {
			membersInfo.push(user.data());
		}
	});
	return membersInfo;
};

export const getUsersTeams = async (userId) => {
	const usersRef = await db.collection("users").doc(userId).get();
	const userData = usersRef.data();

	const memberOfArr = userData.memberOf;

	const allTeams = await db.collection("teams").get();

	const teamsInfo = [];

	allTeams.forEach((team) => {
		if (memberOfArr.includes(team.id)) {
			teamsInfo.push({
				id: team.id,
				pic: team.data().teamPic,
				teamName: team.data().teamName,
				location: team.data().venueLocation,
			});
		}
	});
	return teamsInfo;
};
// submitButton.addEventListener("click", () => {
// 	// createUser();
// 	addPlayer("V3CvouPIpzo6ehGeYBF4", "4xcIcSCBpGp2v0VL606d");
// });
