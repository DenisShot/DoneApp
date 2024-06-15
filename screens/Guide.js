import React, { useState } from "react";
import InlineTextButton from "../components/InlineTextButton";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  SafeAreaView,
} from "react-native";

const Guide = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView style={styles.contentContainer}>
          <Text style={styles.title}>How to Use the App</Text>
          <Text style={styles.text}>
            Welcome to our Task App! This guide will help you understand how to
            navigate the app and manage your tasks effectively.
          </Text>
          <Text style={styles.header}>Creating Tasks</Text>
          <Text style={styles.text}>
            To create a task, navigate to the 'Todo' tab and tap on the 'Add'
            button. Enter the details of your task . Press 'confirm' to add your
            task to the list.
          </Text>
          <Text style={styles.header}>Completing Tasks</Text>
          <Text style={styles.text}>
            You can mark tasks as completed by tapping on the checkbox next to
            each task.
          </Text>
          <Text style={styles.header}>Managing Tasks</Text>
          <Text style={styles.text}>
            Delete tasks by tapping on the button.
          </Text>
          <Text style={styles.header}>Goals</Text>
          <Text style={styles.text}>
            Track your progress with goals as you complete tasks and reach new
            productivity milestones.
          </Text>
          <Text style={styles.header}>Support</Text>
          <Text style={styles.text}>
            Need help? Contact our support team via the 'Help' section in the
            app settings.
          </Text>
          <InlineTextButton
            text="Back to todos"
            color="#258ea6"
            onPress={() => navigation.navigate("ToDo")}
          />
        </ScrollView>
        <TouchableOpacity
          style={styles.helpButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.helpButtonText}>Help?</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Contact Us: denisshot2006@gmail.com
              </Text>
              <Button
                title="Close"
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
  },
  helpButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 20,
  },
  helpButtonText: {
    color: "white",
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
  },
});

export default Guide;
