import React, { useState } from 'react';
import { View, Text, Button, Switch, StyleSheet } from 'react-native';
import { useTheme } from './../hooks/UseTheme';
import ListDeptos from '../components/ListDeptos';

const DepartamentoScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container,]}>
      <Text style={[theme.styles.text, {fontSize: 40}]} >Departamentos</Text>
        <View style={[theme.styles.containerSet, { paddingHorizontal: 20, paddingTop: 20 }]}>
          <ListDeptos/>
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

export default DepartamentoScreen;
