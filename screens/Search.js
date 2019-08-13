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
import styles from "../styles";
import constants from "../constants";

const Header = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 5px 0px;
`;
const TextInput = styled.TextInput`
  width: ${constants.width - 25};
  height: ${constants.height / 23};
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
const ListContainer = styled.View`width: ${constants.width - 20};`;
const ListName = styled.Text`
  font-weight: 500;
  font-size: 15px;
  padding: 5px 3px;
  color: ${styles.darkBlueColor};
`;
const ListAddress = styled.Text`
  font-weight: 200;
  font-size: 12px;
  color: ${styles.blueColor};
`;
const Line = styled.View`
  height: 1px;
  width: ${constants.width - 20};
  background-color: ${styles.lightGreyColor};
  margin: 1px 0px;
`;
const Div = styled.View``;

export default ({ navigation }) => {
  const [listValue, setListValue] = useState([]);
  const [textValue, setTextValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_KEY = constants.API_KEY;
  const onSubmitEditing = async () => {
    try {
      setListValue(null);
      setTextValue("");
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Header>
          <TextInput
            placeholder={"지역을 같이 검색하면 정확도가 올라갑니다."}
            onSubmitEditing={onSubmitEditing}
            returnKeyType={"search"}
            onChangeText={textValue => {
              setTextValue({ textValue }), setLoading(false);
            }}
            clearButtonMode={"always"}
            clearTextOnFocus={true}
          />
        </Header>
        <ScrollView style={{ marginBottom: 10 }}>
          <ListContainer>
            <FlatList
              data={loading ? listValue : null}
              renderItem={({ item }) =>
                <Div>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Detail", {
                        place_id: item.place_id
                      });
                    }}
                  >
                    <ListName>
                      {item.name}
                      <ListAddress>
                        {"\n"}
                        {item.formatted_address}
                      </ListAddress>
                    </ListName>
                  </TouchableOpacity>
                  <Line />
                </Div>}
            />
          </ListContainer>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};
