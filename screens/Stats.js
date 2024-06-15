import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { db, auth } from "../firebase";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import InlineTextButton from "../components/InlineTextButton";

const Stats = ({ navigation }) => {
  const [totalTasks, setTotalTasks] = useState(0);
  const [doneTasks, setDoneTasks] = useState(0);

  useEffect(() => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid; // Get the ID of the currently logged in user
      const q = query(collection(db, "todos"), where("userId", "==", userId));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const tasks = snapshot.docs.map((doc) => doc.data());
        setTotalTasks(tasks.length);
        setDoneTasks(tasks.filter((task) => task.completed).length);
      });

      return () => unsubscribe(); // Cleanup on unmount
    } else {
      // Handle case where no user is logged in, perhaps redirect to login screen
      console.log("No user logged in");
    }
  }, [auth.currentUser]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Total Tasks: {totalTasks}</Text>
      <Text>Done Tasks: {doneTasks}</Text>
      <InlineTextButton
        text="Back to todos"
        color="#258ea6"
        onPress={() => navigation.navigate("ToDo")}
      />
    </View>
  );
};

export default Stats;

const styles = StyleSheet.create({});
