import React, { useState } from "react";
import { Image } from "react-native";
import styled from "styled-components";
import constants from "../constants";
import Loader from "../Loader";

const View = styled.View`flex: 1;`;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const API_KEY = constants.API_KEY;
  const PHOTO_REFERENCE =
    "CmRaAAAAej0dWxY5R41CFcLKliUgSUeEy2F0H6yGIqII8VUWgwc5FRFS2vMkIoBM3sDKkW-tdJaZuzPDkUJYCwC8obQqCVPyP-RzJLHQymB7p0OOwP8McPxXKYjfb4Rj4Mn28IhuEhD5tpz-6_kWWkUAl1PBDSHhGhQZT945TA42qi62m1HVaUG5AzUpog";
  const place_id = navigation.getParam("place_id");
  const [imageRes, setImageRes] = useState(
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${PHOTO_REFERENCE}&key=${API_KEY}`
  );
  const _getInfo = async text => {
    await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJU0t1xHHYZDURLkQHEkrdsIQ&fields=name,photo,formatted_phone_number&key=AIzaSyCBVsA-bEaTqSHSyVphxNJvje9f9DBsEhw`
    )
      .then(response => response.json())
      .then(json => {
        _getList(json.results.length, json.results);
      });
  };
  setTimeout(() => setLoading(true), 2000);

  return (
    <View>
      {loading
        ? <Image
            resizeMode={"contain"}
            source={{
              uri: imageRes
            }}
            style={{ width: constants.width / 3, height: constants.height / 6 }}
          />
        : <Loader />}
    </View>
  );
};
