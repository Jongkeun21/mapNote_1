import React, { useState } from "react";
import { TouchableOpacity, Alert } from "react-native";
import styled from "styled-components";
import styles from "../styles";
import constants from "../constants";

const View = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const Line = styled.View`
  height: 3px;
  width: ${constants.width - 40};
  background-color: ${styles.darkGreyColor};
  margin: 40px 0px;
`;
const Text = styled.Text`
  font-size: 25px;
  color: white;
  font-weight: 400;
`;

export default ({ navigation }) => {
  const handleMap = async () => {
    try {
      await navigator.geolocation.getCurrentPosition(position => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        if (lat !== null && lon !== null) {
          navigation.navigate("MapScreen", { _lat: lat, _lon: lon });
          console.log(lat, lon);
        } else {
          Alert.alert("Can't get your current position. Try again");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const addPost = () => {
    navigation.navigate("Add");
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handleMap}
        style={{ backgroundColor: styles.redColor }}
      >
        <Text>Go to the MAP screen</Text>
      </TouchableOpacity>
      <Line />
      <TouchableOpacity
        onPress={addPost}
        style={{ backgroundColor: styles.blueColor }}
      >
        <Text>Go to the ADD screen</Text>
      </TouchableOpacity>
    </View>
  );
};
