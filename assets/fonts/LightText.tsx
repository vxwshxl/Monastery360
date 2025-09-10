import { Text } from "react-native";
import React from "react";

const LightText = ({ style, ...props }) => {
  return <Text {...props} style={[{ fontFamily: 'SFPRO-LIGHT' }, style]} />;
};

export default LightText;
