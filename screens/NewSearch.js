import React from "react";
import styled from "styled-components";
import constants from "../constants";
import styles from "../styles";

const View = styled.View`
  flex: 1;
  align-items: center;
  width: ${constants.width};
  height: ${constants.height};
`;
const TextInput = styled.TextInput`
  width: ${constants.width - 20};
  height: ${constants.height / 19};
  background-color: ${styles.lightGreyColor};
  padding: 0px 3px;
  margin: 3px 3px;
`;

export default (NewSearch = () => {
  return (
    <View>
      <TextInput placeholder="New Search"  />
    </View>
  );
});
