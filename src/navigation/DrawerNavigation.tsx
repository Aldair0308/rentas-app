import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabsNavigation from './BottomTabsNavigation';
import ConfigScreen from '../screens/ConfigScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => (
  <Drawer.Navigator
    screenOptions={{
      headerShown: true, // Asegúrate de que el encabezado se muestre
      headerTitleAlign: 'center', // Centra el título del encabezado
      headerStyle: {
        backgroundColor: '#007BFF', // Color de fondo del encabezado
      },
      headerTintColor: '#FFF', // Color del texto del encabezado
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 22, // Ajusta el tamaño de la fuente según lo necesites
      },
    }}
  >
    <Drawer.Screen
      name="Alquileres Encanto"
      component={BottomTabsNavigation}
      options={{
        title: 'Alquileres Encanto', // Cambia el título mostrado en el encabezado si es necesario
      }}
    />
    <Drawer.Screen
      name="Config"
      component={ConfigScreen}
      options={{
        title: 'Configuración', // Cambia el título mostrado en el encabezado si es necesario
      }}
    />
  </Drawer.Navigator>
);

export default DrawerNavigation;
