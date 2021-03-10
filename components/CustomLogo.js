import React, { useCallback } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Colors from "../constants/Colors";

//<Text style={{ fontSize: 48, color: Colors.primary }}>R U M B L</Text>
const CustomLogo = (props) => {
  return (
    <View style={[styles.blinkBox, { backgroundColor: "white" }]}>
      <Image
        source={require("../assets/rumbl_no_shadow.png")}
        style={styles.logo}
      ></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  blinkBox: {
    height: 250,
    width: 250,
    borderRadius: 125,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});

export default CustomLogo;
