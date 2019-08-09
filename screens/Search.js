import React, { useState } from "react";
import styled from "styled-components";
import {
  TouchableOpacity,
  Alert,
  Keyboard,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList
} from "react-native";
import { ListItem } from "react-native-elements";
import styles from "../styles";
import constants from "../constants";
import Loader from "../Loader";

const Header = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 5px 0px;
`;
const ListContainer = styled.View`
  width: ${constants.width - 20};
  background-color: ${styles.lightGreyColor};
`;
const TextInput = styled.TextInput`
  width: ${constants.width - 90};
  height: ${constants.height / 22};
  padding: 7px 5px;
  background-color: ${styles.greyColor};
  border: 1px solid ${styles.darkGreyColor};
  border-radius: 4px;
  font-size: 15px;
`;
const View = styled.View`
  flex: 1;
  align-items: center;
`;
const TextButtonContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-left: 8px;
`;
const TextButton = styled.Text`
  font-weight: 600;
  font-size: 15px;
  color: ${styles.blueColor};
`;
const Text = styled.Text`
  font-weight: 500;
  font-size: 15px;
  color: ${styles.darkGreyColor};
`;

export default ({ navigation }) => {
  const arr = [];
  const [textValue, setTextValue] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const API_KEY = "AIzaSyCBVsA-bEaTqSHSyVphxNJvje9f9DBsEhw";
  const onSubmitEditing = async () => {
    try {
      if (textValue.textValue !== null) {
        console.log(textValue.textValue);
        _getInfo(textValue.textValue);
      } else {
        Error;
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Wrong location. Try again");
    } finally {
      setIsLoaded(true);
    }
  };
  const _getList = async (count, info) => {
    try {
      for (let i = 0; i < count; i++) {
        arr.push({
          key: i,
          name: info[i].name,
          formatted_address: info[i].formatted_address,
          location: info[i].geometry.location,
          place_id: info[i].place_id
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const pressed = () => {
    // Alert.alert("Pressed");
    console.log("this is pressed");
  };
  const _getInfo = text => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${text}&region=kr&language=ko&key=${API_KEY}`
    )
      .then(response => response.json())
      .then(json => {
        console.log(json.results.length);
        _getList(json.results.length, json.results);
        console.log(arr[0]);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Header>
          <TextInput
            placeholder={"Search the location which you want"}
            onSubmitEditing={onSubmitEditing}
            returnKeyType={"search"}
            onChangeText={textValue => setTextValue({ textValue })}
            clearButtonMode={"always"}
            clearTextOnFocus={true}
          />
          <TextButtonContainer>
            <TouchableOpacity onPress={onSubmitEditing}>
              <TextButton>Search</TextButton>
            </TouchableOpacity>
          </TextButtonContainer>
        </Header>
        <ListContainer>
          <ScrollView>
            <FlatList
              data={isLoaded ? <Loader /> : arr}
              renderItem={({ item }) => {
                return <ListItem title={item.name} />;
              }}
            />
          </ScrollView>
        </ListContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};
