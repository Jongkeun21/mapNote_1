import React, { useState } from "react";
import styled from "styled-components";
import RNGooglePlaces from "react-native-google-places";
import {
  TouchableOpacity,
  Alert,
  Keyboard,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  EvilIcons
} from "@expo/vector-icons";
import styles from "../styles";
import constants from "../constants";

const Header = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 5px 0px;
`;
const TextInput = styled.TextInput`
  width: ${constants.width - 90};
  height: ${constants.height / 22};
  margin-bottom: 10px;
  padding: 7px 5px;
  background-color: ${styles.greyColor};
  border: 1px solid ${styles.darkGreyColor};
  border-radius: 4px;
  font-size: 15px;
`;
const View = styled.View`flex: 1;`;
const Text = styled.Text`
  margin-left: 7px;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 15px;
  color: ${styles.blueColor};
`;

export default ({ navigation }) => {
  const [textValue, setTextValue] = useState(null);
  const openSearchModal = async () => {
    await RNGooglePlaces.openAutocompleteModal(
      (
        (options = {
          country: "KR",
          locationRestriction: {
            latitudeSW: 6.3670553,
            longitudeSW: 2.7062895,
            latitudeNE: 6.6967964,
            longitudeNE: 4.351055
          }
        }),
        (placeFields = ["cafe"])
      )
    )
      .then(place => {
        console.log(place);
        // place represents user's selection from the
        // suggestions and it is a simplified Google Place object.
      })
      .catch(error => console.log(error.message));
  };
  const onSubmitEditing = async () => {
    try {
      if (textValue.textValue !== null) {
        console.log(textValue.textValue);
      } else {
        Error;
      }
    } catch (error) {
      console.log(error);

      Alert.alert("Wrong location. Try again");
    }
  };
  const pressed = () => {
    // Alert.alert("Pressed");
    console.log("this is pressed");
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
          <TouchableOpacity onPress={openSearchModal}>
            <Text>Search</Text>
          </TouchableOpacity>
        </Header>
      </View>
    </TouchableWithoutFeedback>
  );
};
