import React, { useState } from "react";
import styled from "styled-components";
import MapView from "react-native-maps";
import { TouchableOpacity, Keyboard, FlatList, ScrollView } from "react-native";
import { MaterialIcons, EvilIcons } from "@expo/vector-icons";
import styles from "../styles";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import constants from "../constants";

const View = styled.View`flex: 1;`;
const Header = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;
const TextInput = styled.TextInput`
  width: ${constants.width - 25};
  height: ${constants.height / 23};
  padding: 7px 5px;
  background-color: ${styles.greyColor};
  border: 1px solid ${styles.darkGreyColor};
  border-radius: 4px;
  font-size: 15px;
  margin-bottom: 3px;
  opacity: 0.8;
`;
const ListContainer = styled.View`
  width: ${constants.width - 20};
  height: ${constants.height / 5};
  background-color: ${styles.greyColor};
  opacity: 0.8;
  border: 1px solid ${styles.darkGreyColor};
  border-radius: 2px;
`;
const Div = styled.View``;
const ListName = styled.Text`
  font-weight: 500;
  font-size: 15px;
  padding: 5px 3px;
  color: ${styles.darkBlueColor};
`;

export default ({ navigation }) => {
  const currentZoom = 0.008;
  const initialZoom = 4;
  const currentLat = navigation.getParam("_lat");
  const currentLon = navigation.getParam("_lon");
  const initialRegion = {
    latitude: 36.588965,
    longitude: 127.8770248,
    latitudeDelta: initialZoom,
    longitudeDelta: initialZoom
  };
  const currentRegion = {
    latitude: currentLat,
    longitude: currentLon,
    latitudeDelta: currentZoom,
    longitudeDelta: currentZoom
  };
  const [isClicked, setIsClicked] = useState(false);
  const [region, setRegion] = useState(initialRegion);
  const markers = [
    {
      key: "11111",
      title: "hello",
      coordinate: {
        latitude: currentLat,
        longitude: currentLon
      },
      pinColor: "blue"
    },
    {
      key: "2222",
      title: "hi",
      coordinate: {
        latitude: currentLat + 0.3,
        longitude: currentLon + 0.7
      },
      pinColor: "red"
    }
  ];
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
      console.log("Your current location is ", currentLat, ",", currentLon);
      setRegion(currentRegion);
    } catch (error) {
      console.log(error);
    }
  };
  const backToInitial = () => {
    try {
      console.log("Back to initial zoom level");
      setRegion(initialRegion);
    } catch (error) {
      console.log(error);
    }
  };
  const goToSearch = async () => {
    try {
      await navigation.navigate("Search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <MapView
        style={{ flex: 1 }}
        region={region}
        mapType={"standard"}
        showsMyLocationButton={true}
        showsUserLocation={true}
        showsCompass={false}
        pitchEnabled={false}
        onMarkerPress={pressMarker}
        onPress={Keyboard.dismiss}
      >
        {markers.map(marker =>
          <MapView.Marker
            key={marker.key}
            coordinate={marker.coordinate}
            title={marker.title}
            pinColor={marker.pinColor}
          />
        )}
        <Header>
          <TextInput placeholder={"지역을 같이 검색하면 정확도가 올라갑니다."} />
          <ListContainer>
            <ScrollView>
              <FlatList
                data={[{ key: "item" }]}
                renderItem={({ item }) =>
                  <Div>
                    <ListName>
                      {item.key}
                    </ListName>
                  </Div>}
              />
            </ScrollView>
          </ListContainer>
        </Header>
        {/* <Marker
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
        </Marker> */}
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            marginLeft: 50,
            marginTop: 60,
            backgroundColor: "white",
            borderStyle: "1px solid black",
            borderRadius: 4
          }}
          onPress={goToCurrent}
        >
          <MaterialIcons
            name={"my-location"}
            size={30}
            color={styles.redColor}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            marginLeft: 50,
            marginTop: 10,
            backgroundColor: "white",
            borderStyle: "1px solid black",
            borderRadius: 4
          }}
          onPress={backToInitial}
        >
          <MaterialIcons
            name={"my-location"}
            size={30}
            color={styles.blueColor}
          />
        </TouchableOpacity>
      </MapView>
      {/* <TabBarStyle>
        <TouchableOpacity onPress={() => null}>
          <EvilIcons
            style={{ marginRight: 20 }}
            name={"gear"}
            size={40}
            color={styles.darkGreyColor}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => null}>
          <EvilIcons
            style={{ marginRight: 20 }}
            name={"gear"}
            size={40}
            color={styles.darkGreyColor}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goToSearch}
          style={{ alignContent: "center", justifyContent: "center" }}
        >
          <EvilIcons name={"gear"} size={40} color={styles.darkGreyColor} />
          <Text>Search</Text>
        </TouchableOpacity>
      </TabBarStyle> */}
    </View>
  );
};
