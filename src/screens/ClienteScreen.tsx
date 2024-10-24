import React, { useState } from 'react';
import { View, Text, Button, Switch, StyleSheet } from 'react-native';
import { useTheme } from './../hooks/UseTheme';
import ListClientes from '../components/ListClientes';

const ClientesScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container,]}>
      <Text style={[theme.styles.text, {fontSize: 40}]} >Clientes</Text>
        <View style={[theme.styles.containerSet, { paddingHorizontal: 20, paddingTop: 20 }]}>
          <ListClientes/>
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

export default ClientesScreen;
