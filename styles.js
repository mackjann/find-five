import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		margin: 12,
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		fontSize: 14,
	},
	title: {
		marginLeft: 12,
		marginTop: 12,
		fontSize: 14,
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
		width: Dimensions.get("window").width * 0.7,
		height: Dimensions.get("window").height * 0.4,
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
