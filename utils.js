import firebase from "./config";

//firebase.initializeApp(firebaseConfig);

// initialize cloud firestore via firebase
const db = firebase.firestore();

// const user_name = document.querySelector("#input_name");
// const user_email = document.querySelector("#input_email");
//const submitButton = document.querySelector("#submitButton");

const createTeam = (
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

const createUser = (
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
