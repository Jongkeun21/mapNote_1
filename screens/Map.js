import React, { useState } from "react";
import styled from "styled-components";
import MapView from "react-native-maps";
import {
  TouchableOpacity,
  Keyboard,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
  Alert
} from "react-native";
import styles from "../styles";
import constants from "../constants";
import Info from "./Info";
import Icon from "../components/Icon";
import ListValue from "../components/ListValue";

const View = styled.View`position: absolute;`;
const Blank = styled.View``;
const Header = styled.View``;
const Bottom = styled.View`
  flex-direction: row;
  width: ${constants.width - 40};
  height: 100px;
  background-color: white;
  border-radius: 4px;
  border: 2px solid ${styles.darkBlueColor};
  position: absolute;
  flex: 1;
`;
const TextInput = styled.TextInput`
  width: ${constants.width - 25};
  height: ${constants.height / 23};
  padding: 7px 5px;
  background-color: ${styles.greyColor};
  border: 1px solid ${styles.darkGreyColor};
  border-radius: 4px;
  font-size: 15px;
  margin-bottom: 5px;
  opacity: 0.8;
`;
const ListContainer = styled.View`
  width: ${constants.width - 20};
  background-color: ${styles.greyColor};
  opacity: 0.9;
  border: 1px solid ${styles.darkGreyColor};
  border-radius: 2px;
`;
const Line = styled.View`
  height: 1px;
  width: ${constants.width - 20};
  background-color: ${styles.lightGreyColor};
  margin: 1px 0px;
`;

export default ({ navigation }) => {
  const defaultHeight = 1;
  const currentZoom = 0.002;
  const initialZoom = 4;
  const currentLat = navigation.getParam("_lat");
  const currentLon = navigation.getParam("_lon");
  const initialRegion = {
    latitude: 36.418965,
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
  const [activeHeight, setActiveHeight] = useState(defaultHeight);
  const [region, setRegion] = useState(initialRegion);
  const [listValue, setListValue] = useState([]);
  const [textValue, setTextValue] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listCilcked, setListClicked] = useState(false);
  const [searchedMarker, setSearchedMarker] = useState(null);
  const [info, setInfo] = useState({
    title: "title",
    subTitle: "subTitle"
  });
  const API_KEY = constants.API_KEY;
  const onSubmitEditing = async () => {
    try {
      setSearching(true);
      setListValue(null);
      if (textValue.textValue !== null) {
        console.log(textValue.textValue);
        _getInfo(textValue.textValue);
      } else {
        Error;
      }
      setActiveHeight(constants.height / 3);
    } catch (error) {
      console.log(error);
      Alert.alert("Wrong location. Try again");
    }
  };
  const _getInfo = async text => {
    await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${text}&region=kr&language=ko&key=${API_KEY}`
    )
      .then(response => response.json())
      .then(json => {
        _getList(json.results.length, json.results);
      });
  };
  const _getList = (count, info) => {
    const arr = [];
    try {
      for (let i = 0; i < count; i++) {
        arr.push({
          key: info[i].place_id,
          name: info[i].name,
          formatted_address: info[i].formatted_address,
          location: info[i].geometry.location,
          place_id: info[i].place_id
        });
      }
      setListValue(arr);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
    console.log("2", arr.length);
  };
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
  const pressMarker = () => {
    if (isClicked) {
      console.log("isClicked : false -> true");
      setIsClicked(false);
    } else {
      console.log("isClicked : true -> false");
      setIsClicked(true);
    }
  };
  const backToCurrent = () => {
    try {
      console.log("Your current location is ", currentLat, ",", currentLon);
      setRegion(currentRegion);
      setListClicked(false);
      setSearchedMarker(null);
    } catch (error) {
      console.log(error);
    }
  };
  const backToInitial = () => {
    try {
      console.log("Back to initial zoom level");
      setRegion(initialRegion);
      setListClicked(false);
      setSearchedMarker(null);
    } catch (error) {
      console.log(error);
    }
  };
  const addPost = () => {
    navigation.navigate("Add", { searchedMarker: searchedMarker });
  };
  const Dismiss = () => {
    Keyboard.dismiss();
    setListValue(null);
    setSearching(false);
    setActiveHeight(defaultHeight);
    setTextValue("");
  };

  return (
    <View>
      <MapView
        style={{
          position: "absolute",
          width: constants.width,
          height: constants.height
        }}
        region={region}
        mapType={"standard"}
        showsCompass={false}
        pitchEnabled={false}
        onMarkerPress={pressMarker}
        onPress={Dismiss}
      >
        {markers.map(marker =>
          <MapView.Marker
            key={marker.key}
            coordinate={marker.coordinate}
            title={marker.title}
            pinColor={marker.pinColor}
          />
        )}
        {listCilcked
          ? <MapView.Marker
              coordinate={searchedMarker}
              pinColor={styles.blueColor}
            />
          : null}
        <Icon
          style={{
            width: 30,
            height: 30,
            marginLeft: 40,
            marginTop: 80,
            backgroundColor: "white",
            borderRadius: 4
          }}
          onPress={backToCurrent}
          iconName={"my-location"}
          iconSize={30}
          iconColor={styles.redColor}
        />
        <Icon
          style={{
            width: 30,
            height: 30,
            marginLeft: 40,
            marginTop: 10,
            backgroundColor: "white",
            borderRadius: 4
          }}
          onPress={backToInitial}
          iconName={"settings-backup-restore"}
          iconSize={30}
          iconColor={styles.blueColor}
        />
      </MapView>
      <TouchableWithoutFeedback onPress={Dismiss}>
        <Blank
          style={{
            width: constants.width,
            height: activeHeight,
            alignItems: "center",
            position: "absolute"
          }}
        >
          <Header
            style={{
              height: activeHeight,
              marginTop: 10,
              width: constants.width - 20,
              alignItems: "center",
              position: "absolute"
            }}
          >
            <TextInput
              placeholder={"지역을 같이 검색하면 정확도가 올라갑니다."}
              onSubmitEditing={onSubmitEditing}
              returnKeyType={"search"}
              onChangeText={textValue => {
                setTextValue({ textValue }), setLoading(false), setSearching(
                  false
                ), setActiveHeight(defaultHeight);
              }}
              clearButtonMode={"always"}
              value={textValue.textValue}
            />
            {searching
              ? <ScrollView>
                  <ListContainer>
                    <FlatList
                      data={loading ? listValue : null}
                      renderItem={({ item }) =>
                        <Blank>
                          <TouchableOpacity
                            onPress={() => {
                              setSearchedMarker(null), setListClicked(
                                false
                              ), setListClicked(true), setRegion({
                                latitude: item.location.lat,
                                longitude: item.location.lng,
                                latitudeDelta: currentZoom,
                                longitudeDelta: currentZoom
                              }), setSearchedMarker({
                                latitude: item.location.lat,
                                longitude: item.location.lng
                              }), setInfo({
                                title: item.name,
                                subTitle: item.formatted_address
                              }), Dismiss();
                            }}
                          >
                            <ListValue
                              title={item.name}
                              subTitle={item.formatted_address}
                            />
                          </TouchableOpacity>
                          <Line />
                        </Blank>}
                    />
                  </ListContainer>
                </ScrollView>
              : null}
          </Header>
        </Blank>
      </TouchableWithoutFeedback>
      <Blank
        style={{
          width: constants.width,
          height: activeHeight,
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          marginTop: constants.height / 1.3 + 10
        }}
      >
        {searchedMarker && !searching
          ? <Bottom>
              <Info
                style={{
                  paddingLeft: 17,
                  justifyContent: "center",
                  flex: 0.8
                }}
                title={info.title}
                subTitle={info.subTitle}
              />
              <Blank
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 0.2
                }}
              >
                <Icon
                  onPress={addPost}
                  iconName={"library-add"}
                  iconSize={30}
                  iconColor={styles.blackColor}
                />
              </Blank>
            </Bottom>
          : null}
      </Blank>
    </View>
  );
};
