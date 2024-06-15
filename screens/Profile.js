import { Text, View, Button } from "react-native";
import AppStyles from "../styles/AppStyles";
import React from "react";

export default function Profile({ navigation }) {
  return (
    <View style={AppStyles.container}>
      <Text>Profile</Text>
      <Button title="back to ToDos" onPress={() => navigation.pop()} />
    </View>
  );
}
