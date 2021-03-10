import React from "react";
import { StyleSheet, View, TextInput } from "react-native";

import Colors from "../constants/Colors";

const CustomInput = (props) => {
  return (
    <View style={[styles.container, { backgroundColor: Colors.thirdly }]}>
      <TextInput
        style={styles.input}
        textAlign="center"
        onChangeText={props.onChangeText}
        maxLength={props.maxLength}
        value={props.value}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        autoCapitalize="words"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "80%",
    minWidth: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginVertical: 8,
    backgroundColor: Colors.secondary,
  },
  input: {
    minWidth: "100%",
    fontSize: 22,
  },
});

export default CustomInput;
