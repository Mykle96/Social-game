import React, { useEffect, useState, useRef } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Button,
} from "react-native";
import Animated from "react-native-reanimated";

const SplashPage = () => {
  const [Splashdone, setSplashDone] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Text style={styles.fadingText}>Splash Screen</Text>
      </Animated.View>
      <Button title="fade" onPress={() => fadeIn()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fadingText: {
    fontSize: 28,
    textAlign: "center",
    margin: 10,
  },
});

export default SplashPage;
