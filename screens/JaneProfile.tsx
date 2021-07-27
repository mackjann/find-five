/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "react-native-gesture-handler";
import * as React from "react";
import { Text } from "react-native";

const ProfileScreen = ({ route }: any): JSX.Element => {
	return <Text>This is {route.params.name}s profile</Text>;
};

export default ProfileScreen;
