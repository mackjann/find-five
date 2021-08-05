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
		fontSize: 20,
		color: "#062e03",
		// color: "black",
		marginTop: 15,
		marginBottom: 15,
		// textShadowColor: "white",
		// textShadowRadius: 15,
	},

	button: {
		// flex: 1,
		height: 44,
		// backgroundColor: "#fff",
		backgroundColor: "rgba(211,211,211, 0.8)",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 12,
		borderRadius: 20,
		borderColor: "black",
		borderWidth: 0.5,
		padding: 10,
		width: Dimensions.get("window").width * 0.35,
	},

	small_button: {
		// flex: 1,
		height: 50,
		alignSelf: "center",
		// backgroundColor: "white",
		backgroundColor: "rgba(211,211,211, 0.8)",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 12,
		borderRadius: 20,
		borderColor: "black",
		borderWidth: 0.5,
		width: 140,
	},
	container: {
		flex: 1,

		// backgroundColor: "rgb(120, 184, 51)",

		// backgroundColor: "#5dbb63",
		// backgroundColor: "#3cb371",
		// backgroundColor: "#8f9779",
		// backgroundColor: "#b2beb5",
		backgroundColor: "#c4d5a3",
		// backgroundColor: "#c4f0b9",
		// backgroundColor: "#a2ad9c",
		// backgroundColor: "#6d7073",
		alignItems: "center",
		justifyContent: "center",
		margin: 10,
		borderRadius: 15,
	},

	inner_container: {
		width: Dimensions.get("window").width * 0.9,
		justifyContent: "space-around",
	},

	reg_input: {
		alignSelf: "center",
		padding: 10,
		height: 36,
		margin: 6,
		borderWidth: 1,
		fontSize: 14,
		borderRadius: 10,
		backgroundColor: "rgba(255,255,255,0.6)",
		width: 200,
		// fontStyle: "italic",
	},
	input: {
		alignSelf: "center",
		padding: 10,
		height: 36,
		width: 140,
		margin: 6,
		borderWidth: 1,
		fontSize: 14,
		borderRadius: 10,
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
		marginBottom: 1,
		// width: 50,

		textTransform: "capitalize",

		// padding: 0,
		fontWeight: "700",
		textShadowColor: "white",
		textShadowRadius: 5,
	},

	bubble: {
		flexDirection: "column",
		// textAlign: "center",
		backgroundColor: "#a5bd77",
		borderRadius: 7,
		// borderColor: "black",
		fontSize: 8,
		// borderWidth: 1,
		padding: 2,
		width: 55,
		// height: 50,
		// marginTop: 3,
		// marginBottom: 0,
		// height: 50,
		// textTransform: "capitalize",
		// margin: 0,
		fontWeight: "700",
	},

	arrow: {
		backgroundColor: "transparent",
		borderColor: "transparent",
		borderTopColor: "#a5bd77",
		borderWidth: 8,
		alignSelf: "center",
		marginTop: -32,
	},

	arrowBorder: {
		backgroundColor: "transparent",
		borderColor: "transparent",
		borderTopColor: "transparent",
		// borderTopColor: "#007a87",

		borderWidth: 16,
		alignSelf: "center",
		marginTop: -0.5,
	},

	map: {
		width: Dimensions.get("window").width * 0.8,
		height: Dimensions.get("window").height * 0.41,
		borderColor: "black",
		borderWidth: 1,
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
