import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

const PreGameButton = (props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text
        style={{
          color: props.color ? props.color : Colors.button,
          fontSize: 40,
          fontWeight: "900",
        }}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: "80%",
    minWidth: "80%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 15,
    marginVertical: 8,
    backgroundColor: Colors.thirdly,
    //shadowOffset: {
    //  width: 0,
    //  height: 0,
    //},
    //shadowOpacity: 0.53,
    //shadowRadius: 4.65,
    //elevation: 8,
  },
});

export default PreGameButton;
