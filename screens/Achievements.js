import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import InlineTextButton from "../components/InlineTextButton";

const Achievements = ({ navigation }) => {
  const [data, setData] = useState({
    todosCreated: 0,
    todosCompleted: 0,
    currentStep: 0,
  });

  useEffect(() => {
    if (!auth.currentUser) {
      console.log("No user logged in");
      return;
    }
    const userId = auth.currentUser.uid;
    const q = query(collection(db, "todos"), where("userId", "==", userId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let created = 0;
      let completed = 0;
      snapshot.docs.forEach((doc) => {
        created++;
        if (doc.data().completed) {
          completed++;
        }
      });

      const newStep = calculateStep(created, completed);
      setData({
        todosCreated: created,
        todosCompleted: completed,
        currentStep: newStep,
      });
    });

    return () => unsubscribe();
  }, []);

  const calculateStep = (created, completed) => {
    if (created > 30 && completed > 25) {
      return 3;
    } else if (created < 15 && completed < 10) {
      return 2;
    } else if (created < 5 && completed < 3) {
      return 1;
    }
    return 0;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Achievement Step: {data.currentStep}</Text>
      <Text style={styles.achievementText}>
        Achievement 1: Create 5 todos - {Math.min(data.todosCreated, 5)}/5
      </Text>
      <Text style={styles.achievementText}>
        Achievement 2: Complete 3 todos - {Math.min(data.todosCompleted, 3)}/3
      </Text>
      {data.currentStep >= 2 && (
        <>
          <Text style={styles.achievementText}>
            Achievement 3: Create 15 todos - {Math.min(data.todosCreated, 15)}
            /15
          </Text>
          <Text style={styles.achievementText}>
            Achievement 4: Complete 10 todos -{" "}
            {Math.min(data.todosCompleted, 10)}/10
          </Text>
        </>
      )}
      {data.currentStep >= 3 && (
        <>
          <Text style={styles.achievementText}>
            Achievement 5: Create 30 todos - {Math.min(data.todosCreated, 30)}
            /30
          </Text>
          <Text style={styles.achievementText}>
            Achievement 6: Complete 25 todos -{" "}
            {Math.min(data.todosCompleted, 25)}/25
          </Text>
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
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  achievementText: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default Achievements;
