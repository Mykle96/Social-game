import React, { useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
} from "react-native";
import Colors from "../constants/Colors";

var state = [];

const PackageComponent = (props) => {
  const [pack, key] = useState([
    { name: "Dristig", key: "1", databaseName: "dristig" },
    { name: "Guttastemning", key: "2", databaseName: "guttastemning" },
    { name: "Jentekveld", key: "3", databaseName: "jentekveld" },
    { name: "Grøfta", key: "4", databaseName: "grøfta" },
  ]);

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={{ flex: 1, justifyContent: "center" }}
      keyExtractor={(item) => item.key}
      data={pack}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.packages}
          onPress={() => props.onPressHandler(item.databaseName)}
        >
          <Text style={{ color: Colors.thirdly, fontSize: 20 }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
    alignContent: "center",
  },
  packages: {
    height: 50,
    width: "80%",
    minWidth: "80%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 15,
    marginVertical: 10,
    backgroundColor: Colors.secondary,
  },
});

export default PackageComponent;
