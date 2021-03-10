import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const TestTouchableComponent = (props) => {
  return (
    <View style={styles.TestTouchableComponent}>
      <TouchableOpacity onPress={props.onSelect}>
        <View>
          <View style={{ ...styles.productRow, ...styles.productHeader }}>
            <ImageBackground
              source={{ uri: props.image }}
              style={styles.bgImage}
            >
              <Text style={styles.name} numberOfLines={1}>
                {props.name}
              </Text>
            </ImageBackground>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  TestTouchableComponent: {
    height: 500,
    width: "100%",
    backgroundColor: "#e4e4e4",
    borderRadius: 15,
    overflow: "hidden",
    marginTop: 10,
  },
  productRow: {
    flexDirection: "row",
  },
  bgImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    // resizeMode: 'repeat',
  },
  name: {
    fontSize: 22,
    color: "white",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 5,
    paddingHorizontal: 12,
    textAlign: "center",
  },
});

export default TestTouchableComponent;
