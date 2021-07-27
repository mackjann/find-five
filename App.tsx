/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import JaneProfile from "./screens/JaneProfile";
// import Register from "./screens/Register";

const Stack = createStackNavigator();

export default function App(): any {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={Home} />
				{/* <Stack.Screen name="Register" component={Register} /> */}
				<Stack.Screen name="Profile" component={JaneProfile} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
