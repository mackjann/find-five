import { StyleSheet } from "react-native";

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
});

export default styles;
