import React from 'react';
import { View, Text } from 'react-native';
import { lightTheme } from '../theme/Theme';

const ConfigScreen = () => (
  <View style={lightTheme.styles.container}>
    <Text style={lightTheme.styles.text}>Config Screen</Text>
  </View>
);

export default ConfigScreen;
