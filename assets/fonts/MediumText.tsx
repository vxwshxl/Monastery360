import { Text } from "react-native";
import React from "react";

const MediumText = ({ style, ...props }) => {
  return <Text {...props} style={[{ fontFamily: 'SFPRO-MEDIUM' }, style]} />;
};

export default MediumText;
