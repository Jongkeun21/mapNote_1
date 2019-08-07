import React from "react";
import styled from "styled-components";
import MainNavigation from "./navigation/MainNavigation";

const View = styled.View`flex: 1;`;

export default () => {
  return (
    <View>
      <MainNavigation />
    </View>
  );
};
