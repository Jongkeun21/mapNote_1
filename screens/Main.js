import React, { useState } from "react";
import { TouchableOpacity, Alert } from "react-native";
import styled from "styled-components";

const View = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`font-size: 20px;`;

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

  return (
    <View>
      <TouchableOpacity onPress={handleMap}>
        <Text>Go to the MAP screen</Text>
      </TouchableOpacity>
    </View>
  );
};
