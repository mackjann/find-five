/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import firebase from "./config";
import "firebase/storage";

// initialize cloud firestore via firebase
const db = firebase.firestore();

// get reference to storage service
const storageRef = firebase.storage().ref();

const khizRef = storageRef.child("khiz.jpg");

const userImagesRef = storageRef.child("users_images/khiz.jpg");

export const uploadImageToStorage = (path) => {
	let task = khizRef.putFile(path);

	task
		.then(() => {
			console.log("Image uploaded to the bucket!");
		})
		.catch((e) => console.log("uploading image error => ", e));
};

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

export const createUser = (
	firstName,
	lastName,
	email,
	username,
	location,
	position,
	skill,
	ageGroup,
	availability
) => {
	db.collection("users")
		.add({
			ageGroup: ageGroup,
			availability: availability,

			bio: "",
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
	const placePlayer = (members) => {
		db.collection(`teams/${teamId}/members`)
			.doc("membersArray")
			.set(
				{
					members: [...members, userId],
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
	placePlayer(members);
};

// submitButton.addEventListener("click", () => {
// 	// createUser();
// 	addPlayer("V3CvouPIpzo6ehGeYBF4", "4xcIcSCBpGp2v0VL606d");
// });
