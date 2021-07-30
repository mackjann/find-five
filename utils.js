/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import firebase from "./config";
import "firebase/storage";
import "firebase/auth";

// initialize cloud firestore via firebase
const db = firebase.firestore();

// get reference to storage service
const storageRef = firebase.storage().ref();

// /Users/khizariqbal/Desktop
export const createTeam = (
	teamName,
	venue,
	venueLocation,
	lookingFor,
	admin,
	availability
) => {
	// in dev pls add user state as param to this func
	db.collection("teams")
		.add({
			admin: admin,
			availability: availability,
			bio: "",
			lookingFor: lookingFor,
			teamName: teamName,
			teamPic: true,
			venue: venue,
			venueLocation: venueLocation,
		})
		.then((docRef) => {
			const data = {
				members: [],
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
	console.log(userID);
	await db
		.collection("users")
		.doc(userID)
		.set({
			ageGroup: ageGroup,
			availability: availability,
			bio: bio,
			email: email,
			firstName: firstName,
			LastName: lastName,
			location: location,
			position: position,
			profilePic: true,
			skill: skill,
			username: username,
		})
		.then((newUser) => {
			console.log(newUser);
		})
		.catch((err) => {
			console.log("BRUH:", err);
		});
};

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

	const playerDataRef = await db.collection("users").doc(userId).get();
	const playerData = playerDataRef.data();

	const placePlayer = (members, player, id) => {
		db.collection(`teams/${teamId}/members`)
			.doc("membersArray")
			.set(
				{
					members: [...members, { [id]: { player }, hasAccepted: false }],
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
	placePlayer(members, playerData, userId);

	const userRequest = playerData.requests;

	db.collection("users")
		.doc(userId)
		.set(
			{
				requests: [...userRequest, teamId],
			},
			{ merge: true }
		);
};

// export const removePlayerFromTeam = async (teamID, playerID) => {};

export const getUser = async (searchQuery) => {
	const lcQuery = searchQuery.toLowerCase();
	const usersRef = db.collection("users");
	const data = await usersRef.where("username", "==", lcQuery).get();
	if (data.empty) {
		return null;
	}
	const userObj = {};
	data.forEach((user) => {
		userObj[user.id] = user.data();
	});
	return userObj;
};

// can be one or more team
export const getTeam = async (searchTerm, field) => {
	let cleanSearchTerm = "";
	if (searchTerm.length > 3) {
		cleanSearchTerm = searchTerm.toLowerCase();
	} else {
		cleanSearchTerm = searchTerm.toUpperCase();
	}
	const teamsRef = db.collection("teams");
	const data = await teamsRef.where(field, "==", cleanSearchTerm).get();
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

export const editUserInfo = async (userId, field, input) => {
	try {
		const userData = await db
			.collection("users")
			.doc(userId)
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

	const requestsArrRef = await db.collection("users").doc(userId).get();
	const requestsArr = requestsArrRef.data().requests;
	console.log(requestsArr);

	const newRequestsArr = requestsArr.filter((request) => request !== teamId);

	db.collection("users").doc(userId).set(
		{
			requests: newRequestsArr,
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

	const newMembersArr = membersArray.filter((member) => !member[userId]);

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

// submitButton.addEventListener("click", () => {
// 	// createUser();
// 	addPlayer("V3CvouPIpzo6ehGeYBF4", "4xcIcSCBpGp2v0VL606d");
// });
