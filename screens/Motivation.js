import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import InlineTextButton from "../components/InlineTextButton";

const Motivation = ({ navigation }) => {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [showMoreButton, setShowMoreButton] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://zenquotes.io/api/random");
      setQuote(response.data[0].q + " - " + response.data[0].a); // Assuming response.data[0] has a quote object with 'q' as the quote and 'a' as the author
      setShowMoreButton(true); // Show the "Need more motivation?" button
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote("Failed to fetch quote.");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Need motivation to start doing your tasks?
      </Text>
      {showPrompt ? (
        <View style={styles.buttonGroup}>
          <Button
            title="Yes"
            onPress={() => {
              fetchQuote();
              setShowPrompt(false);
            }}
          />
          <Button
            title="No"
            onPress={() => {
              setQuote("Great then keep up the work!");
              setShowPrompt(false);
              setShowMoreButton(false);
            }}
          />
        </View>
      ) : loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={styles.quoteText}>{quote}</Text>
          {showMoreButton && (
            <Button title="Need more motivation?" onPress={fetchQuote} />
          )}
        </>
      )}
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
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  headerText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  quoteText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default Motivation;
