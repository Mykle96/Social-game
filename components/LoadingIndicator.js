import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const LoadingIndicator = (props) => {
  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#252b30",
  },
});

export default LoadingIndicator;
