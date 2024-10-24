import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alquileres Encanto</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')} // Asegúrate de que el nombre coincide con las pantallas de tu `DrawerNavigator`
      >
        <Text style={styles.buttonText}>Inicio</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Config')}
      >
        <Text style={styles.buttonText}>Config</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: '#007BFF',
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default DrawerContent;
