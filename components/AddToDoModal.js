import { View, Text, TextInput, Button } from "react-native";

import React from "react";
import AppStyles from "../styles/AppStyles";

export default function AddToDoModal(props) {
  let [todo, setTodo] = React.useState("");
  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.header}>Add Todo</Text>
      <TextInput
        style={[AppStyles.textInput, AppStyles.darkTextInput]}
        placeholder="ToDo"
        value={todo}
        onChangeText={setTodo}
      />

      <View
        style={[
          AppStyles.rowContainer,
          AppStyles.rightAlinged,
          AppStyles.rightMargin,
        ]}
      >
        <Button title="Cancel" onPress={props.onClose} />
        <Button
          title="OK"
          onPress={() => {
            props.addToDo(todo);
            setTodo("");
            props.onClose();
          }}
        />
      </View>
    </View>
  );
}
