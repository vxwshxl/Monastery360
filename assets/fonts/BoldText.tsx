import { Text } from "react-native";
import React from "react";

const BoldText = ({ style, ...props }) => {
  return <Text {...props} style={[{ fontFamily: 'SFPRO-BOLD' }, style]} />;
};

export default BoldText;
