/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StackNavigationProp } from "@react-navigation/stack";
import Home from "./screens/Home";
import Register from "./screens/Register";
import CreateProfile from "./screens/CreateProfile";
import MyProfile from "./screens/MyProfile";

import Search from "./screens/SearchPlayers";

import HomeScreen from "./screens/HomeScreen";
import { StackScreenProps } from "@react-navigation/stack";


// type RootStackParamList = {
// 	Home: undefined;
// 	Register: undefined;
// 	CreateProfile: { firstName: string };
// 	MyProfile: undefined;
// };

// // type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

// // type CreateProfileScreenFirstNameProp = StackNavigationProp<
// // 	RootStackParamList,
// // 	"CreateProfile"
// // >;

// export type Props = StackScreenProps<RootStackParamList, "CreateProfile">;

const Stack = createStackNavigator /*<RootStackParamList>*/();

export default function App(): any {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="Register" component={Register} />
				<Stack.Screen name="CreateProfile" component={CreateProfile} />
				<Stack.Screen name="MyProfile" component={MyProfile} />

				<Stack.Screen name="Search" component={Search} />

				<Stack.Screen name="HomeScreen" component={HomeScreen} />

			</Stack.Navigator>
		</NavigationContainer>
	);
}
