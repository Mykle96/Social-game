import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Vibration, Alert } from "react-native";
import CustomLogo from "./CustomLogo";

const Timer = (props) => {
  const [isShowing, setIsShowing] = useState(false);
  const game = props.game;
  const player = props.player;
  const randList = game.randomPlayerList;
  const [index, setIndex] = useState(0);
  const [durationList, setDurationList] = useState(
    calculateDuration(randList.length)
  );
  const [hostActive, setHostActive] = useState(true);

  useEffect(() => {
    if (!hostActive && player.role.localeCompare("host") != 0) {
      Alert.alert(
        "Game Master inactive!",
        "The Game Master has left the app. Please wait for him to return!",
        "Okay"
      );
    }
  }, [hostActive]);

  useEffect(() => {
    let isSubscribed = true;
    if (index < randList.length) {
      if (game.hostActive) {
        if (hostActive) {
          setHostActive(true);
        }
        setIsShowing(false);
        if (randList[index] == player.playerId) {
          Vibration.vibrate(0.1);
          setIsShowing(true);
        }
        setTimeout(() => {
          if (!isSubscribed) {
            return null;
          }
          setIndex((index) => index + 1);
          // setIsShowing(false);
        }, durationList[index]);
      } else {
        setHostActive(false);
      }
    }
    // This is a cleanup function, makes error messages go away :)
    return () => {
      isSubscribed = false;
    };
  }, [index, game.hostActive]);

  if (index >= randList.length) {
    props.onTimerDone();
  }
  if (isShowing) {
    return <CustomLogo />;
  } else {
    return <View />;
  }
};

const styles = StyleSheet.create({});

export default Timer;

export const calculateDuration = (length) => {
  const maxDur = 1000;
  let durationArray = [];
  let tempDuration = maxDur;
  let sumArray = 0;
  for (let i = 0; i < length; i++) {
    durationArray.push(tempDuration);
    sumArray += tempDuration;
    tempDuration = tempDuration * 0.95; // The next player lights up 0.95 times the duration of this player
  }
  let normalisedArray = [];
  for (let i = 0; i < length; i++) {
    // How long should the whole random sequence last?
    normalisedArray.push((durationArray[i] / sumArray) * 8000);
  }
  return normalisedArray;
};
