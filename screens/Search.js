import React, { useState } from "react";
import styled from "styled-components";
import {
  TouchableOpacity,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList
} from "react-native";
import { ListItem } from "react-native-elements";
import styles from "../styles";
import constants from "../constants";

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
  const [listValue, setListValue] = useState([]);
  const [textValue, setTextValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_KEY = "AIzaSyCBVsA-bEaTqSHSyVphxNJvje9f9DBsEhw";
  const onSubmitEditing = async () => {
    try {
      setListValue(null);
      if (textValue.textValue !== null) {
        console.log(textValue.textValue);
        _getInfo(textValue.textValue);
      } else {
        Error;
      }
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
  const _getCount = () => {
    console.log(listValue.length);
  }

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
              data={loading ? listValue : [{ key: "Loading", name: "Loading" }]}
              renderItem={({ item }) => 
                <Text>{item.name}</Text>
              }
            />
          </ScrollView>
        </ListContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};
