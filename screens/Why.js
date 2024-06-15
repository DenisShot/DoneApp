import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import InlineTextButton from "../components/InlineTextButton";

const Why = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>
        Why Choose Our App?
        {"\n\n"}
        Our app stands out from the competition by offering unique features that
        are tailored to enhance your productivity and simplify your life. Here
        are a few reasons why our app is a superior choice:
        {"\n\n"}
        1. **User-Friendly Interface**: Our app has a clean, intuitive interface
        that makes it easy for anyone to get started and effectively manage
        their tasks.
        {"\n\n"}
        2. **Reliable and Secure**: Security is our top priority. Your data is
        encrypted and stored securely, ensuring that your information remains
        safe at all times.
        {"\n\n"}
        Choose our app to experience a more organized and stress-free life!
      </Text>
      <InlineTextButton
        text="Back to todos"
        color="#258ea6"
        onPress={() => navigation.navigate("ToDo")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginRight: 20,
    marginLeft: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default Why;
