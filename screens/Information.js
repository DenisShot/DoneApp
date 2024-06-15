import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { auth } from "../firebase";
import InlineTextButton from "../components/InlineTextButton";

const Information = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    creationDate: "",
  });

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserInfo({
        email: user.email,
        creationDate: user.metadata.creationTime,
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Email: {userInfo.email}</Text>
      <Text style={styles.text}>
        Account Created: {new Date(userInfo.creationDate).toLocaleDateString()}
      </Text>
      <InlineTextButton
        text="Back to todos"
        color="#258ea6"
        onPress={() => navigation.navigate("ToDo")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 16,
    margin: 10,
  },
});

export default Information;
