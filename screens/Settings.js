import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import InlineTextButton from "../components/InlineTextButton";

const Settings = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings</Text>
      <InlineTextButton
        text="Back to todos"
        color="#258ea6"
        onPress={() => navigation.navigate("ToDo")}
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
