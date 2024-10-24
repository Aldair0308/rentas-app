import React, { useState } from 'react';
import { View, Text, Button, Switch, StyleSheet } from 'react-native';
import { useTheme } from './../hooks/UseTheme';
import ListGastos from '../components/ListGastos';

const GastosScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container,]}>
      <Text style={[theme.styles.text, {fontSize: 40}]} >Gastos</Text>
        <View style={[theme.styles.containerSet, { paddingHorizontal: 20, paddingTop: 20 }]}>
          <ListGastos/>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  containerSet: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});

export default GastosScreen;
