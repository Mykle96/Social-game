import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import PackageComponent from "../components/PackageComponent";
import Colors from "../constants/Colors";

const ShopScreen = (props) => {
  const onPressHandler = (packageName) => {
    console.log("hei");
  };

  return (
    <View style={styles.view}>
      <PackageComponent onPressHandler={onPressHandler}></PackageComponent>
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: Colors.primary,
  },
  packages: {
    borderWidth: 1,
    height: 42,
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
  },
});

export default ShopScreen;
