import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth } from "../firebase";
import InlineTextButton from "../components/InlineTextButton";

export default function GoalScreen({ navigation }) {
  const [goalInput, setGoalInput] = useState("");
  const [goal, setGoal] = useState("");
  const [completedTasks, setCompletedTasks] = useState(0);
  const [goalReached, setGoalReached] = useState(false);

  useEffect(() => {
    // Load the active goal and completed tasks from AsyncStorage when the component mounts
    const loadGoalData = async () => {
      const storedGoal = await AsyncStorage.getItem("goal");
      const storedCompletedTasks = await AsyncStorage.getItem("completedTasks");
      if (storedGoal) {
        setGoal(storedGoal);
        setGoalInput(storedGoal);
      }
      if (storedCompletedTasks) {
        setCompletedTasks(parseInt(storedCompletedTasks));
        if (storedGoal) {
          setGoalReached(
            parseInt(storedCompletedTasks) >= parseInt(storedGoal)
          );
        }
      }
    };

    loadGoalData();
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "todos"),
      where("userId", "==", auth.currentUser.uid),
      where("completed", "==", true)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const numCompletedTasks = snapshot.size;
      AsyncStorage.setItem("completedTasks", numCompletedTasks.toString());
      setCompletedTasks(numCompletedTasks);
      setGoalReached(numCompletedTasks >= parseInt(goal));
    });

    return () => unsubscribe(); // Cleanup subscription
  }, [goal]);

  const handleSetGoal = async () => {
    await AsyncStorage.setItem("goal", goalInput); // Store the goal input as the active goal
    setGoal(goalInput); // Update the active goal
    setGoalReached(false); // Reset goal status when setting a new goal
  };

  const handleResetGoal = () => {
    AsyncStorage.removeItem("goal"); // Clear the goal from storage
    setGoal("");
    setGoalInput("");
    setGoalReached(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Set your goal for completed tasks"
        value={goalInput}
        onChangeText={setGoalInput}
      />
      {!goal && !goalReached && (
        <Button title="Set Goal" onPress={handleSetGoal} />
      )}
      {!goalReached && goal && (
        <Text>
          You have {Math.max(0, parseInt(goal) - completedTasks)} todos left to
          complete.
        </Text>
      )}
      {goalReached && (
        <View>
          <Text>Congrats! You completed your goal of {goal} tasks!</Text>
          <Button title="Set New Goal" onPress={handleResetGoal} />
        </View>
      )}
      {!goal && goalReached && <Text>Enter a new goal.</Text>}
      <InlineTextButton
        text="Back to todos"
        color="#258ea6"
        onPress={() => navigation.navigate("ToDo")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "80%",
  },
});
