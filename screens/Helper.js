import React from "react";
import { View, Button, StyleSheet } from "react-native";

function Helper({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Button title="Stats" onPress={() => navigation.navigate("Stats")} />
        <Button title="ToDo" onPress={() => navigation.navigate("ToDo")} />
      </View>
      <View style={styles.row}>
        <Button title="Guide" onPress={() => navigation.navigate("Guide")} />
        <Button
          title="Motivation"
          onPress={() => navigation.navigate("Motivation")}
        />
      </View>
      <View style={styles.row}>
        <Button title="Goal" onPress={() => navigation.navigate("Goal")} />
        <Button
          title="Information"
          onPress={() => navigation.navigate("Information")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
});

export default Helper;
