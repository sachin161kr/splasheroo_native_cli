import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "react-native-vector-icons";

const CheckBox = (props) => {
	const iconName = props.isChecked ?
		"checkbox-marked" : "checkbox-blank-outline";

	return (
		<View className="flex-row px-4 mt-5 items-center">
			<Pressable onPress={props.onPress}>
				<MaterialCommunityIcons
					name={iconName} size={24} color="#00BCD4" />
			</Pressable>
			<Text className="ml-2">{props.title}</Text>
		</View>
	);
};

export default CheckBox;