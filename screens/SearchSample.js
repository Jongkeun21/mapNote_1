import React, { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import styles from "../styles";
import styled from "styled-components";
import constants from "../constants";

const View = styled.View`
  flex: 1;
  width: ${constants.width};
  height: ${constants.height};
`;

export default (GooglePlacesInput = ({ navigation }) => {
  const API_KEY = "AIzaSyCBVsA-bEaTqSHSyVphxNJvje9f9DBsEhw";
  const _lat = navigation.getParam("currentLat");
  const _lon = navigation.getParam("currentLon");
  console.log(_lat, _lon);

  const Text = styled.Text``;

  const homePlace = {
    description: "Home",
    geometry: {
      location: {
        lat: _lat,
        lng: _lon
      }
    }
  };

  return (
    <View>
      <GooglePlacesAutocomplete
        placeholder="Search"
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/TextInput.html#returnkeytype
        keyboardAppearance={"light"} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/TextInput.html#keyboardappearance
        // listViewDisplayed="true" // true/false/undefined
        fetchDetails={true}
        renderDescription={row =>
          row.description || row.formatted_address || row.name} // custom description render
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
          console.log(_lat, _lon);
        }}
        getDefaultValue={() => ""}
        styles={{
          TextInputContainer: {
            width: "100%"
          },
          description: {
            fontWeight: "bold",
            color: styles.blackColor
          },
          predefinedPlacesDescription: {
            color: styles.blackColor
          }
        }}
        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: API_KEY,
          language: "ko", // language of the results
          types: "establishment", // default: 'geocode'
          components: "country:kr",
          region: "kr",
          // location: "36.624395405091775, 127.45798919762582",
          // radius: "5000",
          // strictbounds: true
        }}
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: "distance",
          key: API_KEY,
          location: "36.624395405091775, 127.45798919762582",
          type: "cafe"
        }}
        GooglePlacesDetailsQuery={{
          // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
          fields: "formatted_address"
        }}
        filterReverseGeocodingByTypes={[
          "locality",
          "administrative_area_level_3"
        ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        // predefinedPlaces={[homePlace]}
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        //   renderLeftButton={() =>
        //     <Image
        //       source={require("../assets/icon.png")}
        //       resizeMode="contain"
        //       style={{ width: constants.width / 7, height: constants.width / 7 }}
        //     />}
        //   renderRightButton={() => <Text>input</Text>}
      />
    </View>
  );
});
