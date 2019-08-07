import React, { useState } from "react";
import styled from "styled-components";
import MapView, { Marker } from "react-native-maps";
import { TouchableOpacity, Alert, Keyboard, Image } from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  EvilIcons
} from "@expo/vector-icons";
import styles from "../styles";
import constants from "../constants";

const View = styled.View`flex: 1;`;
const Text = styled.Text`
  margin-top: 50px;
  margin-left: 7px;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 15px;
  color: ${styles.blueColor};
`;
const TabBarStyle = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 20px 0px;
  padding-bottom: 20px;
`;

export default ({ navigation }) => {
  const zoomLevel = 0.008;
  const currentLat = navigation.getParam("_lat");
  const currentLon = navigation.getParam("_lon");
  const markerStyle = {
    width: 50,
    height: 50
  };
  const [isClicked, setIsClicked] = useState(false);
  const [isCurrent, setIsCurrent] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [searchLocation, setSearchLocation] = useState({
    latitude: currentLat,
    longitude: currentLon,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008
  });
  const region = {
    latitude: currentLat,
    longitude: currentLon,
    latitudeDelta: zoomLevel,
    longitudeDelta: zoomLevel
  };
  const pressed = () => {
    // Alert.alert("Pressed");
    console.log("this is pressed");
  };
  const pressMarker = () => {
    if (isClicked) {
      console.log("isClicked : false -> true");
      setIsClicked(false);
    } else {
      console.log("isClicked : true -> false");
      setIsClicked(true);
    }
  };
  const goToCurrent = () => {
    try {
      console.log("this is pressed");
      setIsCurrent(true);
      if (isCurrent) {
        setSearchLocation(region);
      }
      setTimeout(() => {
        setIsCurrent(false), setIsSearched(false);
      }, 100);
    } catch (error) {
      console.log(error);
    }
  };
  const goToSearch = async () => {
    try {
      await navigation.navigate("SearchSample", {
        currentLat: currentLat,
        currentLon: currentLon
      });
    } catch (error) {
      console.log(error);
    }
  };
  const goToSearch2 = async () => {
    try {
      await navigation.navigate("SearchSample2", {
        currentLat: currentLat,
        currentLon: currentLon
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <MapView
        style={{ flex: 1 }}
        region={isCurrent ? region : isSearched ? searchLocation : region}
        mapType={"standard"}
        showsMyLocationButton={true}
        showsCompass={false}
        pitchEnabled={false}
        onMarkerPress={pressMarker}
      >
        <Marker
          coordinate={isCurrent ? region : isSearched ? searchLocation : region}
          pinColor={styles.blueColor}
        >
          <Image
            source={{
              uri: "http://www.sclance.com/pngs/point-png/point_png_1091546.png"
            }}
            resizeMode="contain"
            style={markerStyle}
          />
        </Marker>
      </MapView>
      <TabBarStyle>
        <TouchableOpacity onPress={goToCurrent}>
          <MaterialIcons
            style={{ marginRight: 20 }}
            name={"my-location"}
            size={40}
            color={styles.blueColor}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToSearch}>
          <EvilIcons
            style={{ marginRight: 20 }}
            name={"gear"}
            size={40}
            color={styles.darkGreyColor}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToSearch2}>
          <EvilIcons
            style={{ marginRight: 20 }}
            name={"gear"}
            size={40}
            color={styles.darkGreyColor}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={pressed}>
          <EvilIcons name={"gear"} size={40} color={styles.darkGreyColor} />
        </TouchableOpacity>
      </TabBarStyle>
    </View>
  );
};
