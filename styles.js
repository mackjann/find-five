import { StyleSheet, Dimensions } from "react-native";
// import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";

const styles = StyleSheet.create({
	appHeader: {
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 30,
		color: "darkgreen",
		marginTop: 30,
		marginBottom: 30,
		textShadowColor: "white",
		textShadowRadius: 15,
	},

	button_text: {
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 22,
		color: "darkgreen",
		marginTop: 15,
		marginBottom: 15,
		textShadowColor: "white",
		textShadowRadius: 15,
	},

	button: {
		// flex: 1,
		height: 50,
		// backgroundColor: "#fff",
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 12,
		borderRadius: 20,
		borderColor: "black",
		borderWidth: 4,
		width: Dimensions.get("window").width * 0.44,
	},

	small_button: {
		// flex: 1,
		height: 50,
		alignSelf: "center",
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 12,
		borderRadius: 20,
		borderColor: "black",
		borderWidth: 4,
		width: 140,
	},
	container: {
		flex: 1,
		// backgroundColor: "#fff",
		backgroundColor: "rgb(120, 184, 51)",
		alignItems: "center",
		justifyContent: "center",
		margin: 10,
		borderRadius: 15,
	},

	inner_container: {
		width: Dimensions.get("window").width * 0.9,
		height: Dimensions.get("window").height * 0.22,
		justifyContent: "space-around",
	},
	input: {
		alignSelf: "center",
		padding: 10,
		height: 36,
		width: 140,
		margin: 6,
		borderWidth: 2,
		fontSize: 14,
		borderRadius: 15,
		backgroundColor: "rgba(255,255,255,0.6)",
		// fontStyle: "italic",
	},
	title: {
		marginLeft: 12,
		marginTop: 12,
		fontSize: 14,
	},

	question: {
		textAlign: "left",
		fontSize: 18,
		padding: 15,
		marginTop: 10,
		marginBottom: 10,
		// width: 160,
		color: "darkgreen",
		//textTransform: "capitalize",
	},

	info: {
		textAlign: "left",
		fontSize: 12,
		marginTop: 10,
		marginBottom: 0,
		width: 200,
		//textTransform: "capitalize",
	},

	list: {
		textAlign: "left",
		fontSize: 12,
		marginTop: 3,
		marginBottom: 0,
		width: 200,
		textTransform: "capitalize",
	},

	callout: {
		textAlign: "center",
		fontSize: 8,
		// marginTop: 3,
		// marginBottom: 0,
		width: 50,
		height: 20,
		textTransform: "capitalize",
		margin: 0,
		padding: 0,
		fontWeight: "700",
	},

	map: {
		width: Dimensions.get("window").width * 0.8,
		height: Dimensions.get("window").height * 0.41,
		borderColor: "black",
		borderWidth: 2,
	},

	customView: {
		backgroundColor: "rgba(86,125,70,0.4)",
		borderRadius: 20,
		width: 50,
		height: 40,
		// margin: 0,
		// padding: 0,
	},
});

export default styles;
