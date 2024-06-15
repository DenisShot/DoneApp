import {
  View,
  Button,
  Text,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  FlatList,
} from "react-native";
import InlineTextButton from "../components/InlineTextButton";
import AppStyles from "../styles/AppStyles";
import { auth, db } from "../firebase";
import * as Speech from "expo-speech";

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";

import { sendEmailVerification } from "firebase/auth";
import React from "react";
import AddToDoModal from "../components/AddToDoModal";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function ToDo({ navigation }) {
  let [modalVisible, setModalVisible] = React.useState(false);
  let [isLoading, setIsLoading] = React.useState(true);
  let [isRefreshing, setIsRefreshing] = React.useState(false);
  let [toDos, setToDos] = React.useState([]);

  let loadToDoList = async () => {
    const q = query(
      collection(db, "todos"),
      where("userId", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    let toDos = [];
    querySnapshot.forEach((doc) => {
      let toDo = doc.data();
      toDo.id = doc.id;
      toDos.push(toDo);
    });

    setToDos(toDos);
    setIsLoading(false);
    setIsRefreshing(false);
  };

  if (isLoading) {
    loadToDoList();
  }

  let checkToDoItem = (item, isChecked) => {
    const toDoRef = doc(db, "todos", item.id);
    setDoc(toDoRef, { completed: isChecked }, { merge: true });
  };

  let deleteToDo = async (toDoId) => {
    await deleteDoc(doc(db, "todos", toDoId));

    let updatedToDos = [...toDos].filter((item) => item.id != toDoId);
    setToDos(updatedToDos);
  };

  let renderToDoItem = ({ item }) => {
    const speakText = () => {
      Speech.speak(item.text, {
        language: "en-US", // Optional parameter to specify the language
        pitch: 1.0, // Pitch of the speech, where 1.0 is the normal pitch
        rate: 1.0, // Speed at which the text will be spoken
      });
    };
    return (
      <View
        style={[
          AppStyles.rowContainer,
          AppStyles.rightMargin,
          AppStyles.leftMargin,
        ]}
      >
        <View style={AppStyles.fillSpace}>
          <BouncyCheckbox
            isChecked={item.complated}
            size={25}
            fillColor="#258ea6"
            unfillColor="#FFFFFF"
            text={item.text}
            iconStyle={{ borderColor: "#258ea6" }}
            onPress={(isChecked) => {
              checkToDoItem(item, isChecked);
            }}
          />
        </View>

        <InlineTextButton
          text="Delete"
          color="#258ea6"
          onPress={() => deleteToDo(item.id)}
        />
        <InlineTextButton text="Speak" color="#258ea6" onPress={speakText} />
      </View>
    );
  };

  let showTodoList = () => {
    return (
      <FlatList
        data={toDos}
        refreshing={isRefreshing}
        onRefresh={() => {
          loadToDoList();
          setIsRefreshing(true);
        }}
        renderItem={renderToDoItem}
        keyExtractor={(item) => item.id}
      />
    );
  };

  let showContent = () => {
    return (
      <View>
        {isLoading ? <ActivityIndicator size="large" /> : showTodoList()}
        <Button
          title="Add ToDo"
          onPress={() => setModalVisible(true)}
          color="#fb4d3d"
        />
      </View>
    );
  };

  let showSendVerifactionEmail = () => {
    return (
      <View>
        <Text>Please Verify your email to use ToDo</Text>
        <Button
          title="Send Verification Email"
          onPress={() => sendEmailVerification(auth.currentUser)}
        />
      </View>
    );
  };

  let addToDo = async (todo) => {
    let toDoToSave = {
      text: todo,
      completed: false,
      userId: auth.currentUser.uid,
    };
    const docRef = await addDoc(collection(db, "todos"), toDoToSave);

    toDoToSave.id = docRef.id;

    let updatedToDos = [...toDos];
    updatedToDos.push(toDoToSave);

    setToDos(updatedToDos);
  };

  return (
    <SafeAreaView>
      <View
        style={[
          AppStyles.rowContainer,
          AppStyles.rightAlinged,
          AppStyles.rightMargin,
          AppStyles.topMargin,
        ]}
      >
        <InlineTextButton
          text="Manage Account"
          color="#258ea6"
          onPress={() => navigation.navigate("ManageAccount")}
        />
      </View>
      <View
        style={[
          AppStyles.rowContainer,
          AppStyles.leftAlinged,
          AppStyles.leftMargin,
          AppStyles.topMargin,
        ]}
      >
        <InlineTextButton
          text="Helper"
          color="#258ea6"
          onPress={() => navigation.navigate("Helper")}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <AddToDoModal
          onClose={() => setModalVisible(false)}
          addToDo={addToDo}
        />
      </Modal>
      <Text style={AppStyles.header}>ToDo</Text>
      {auth.currentUser.emailVerified
        ? showContent()
        : showSendVerifactionEmail()}
    </SafeAreaView>
  );
}
