import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from './../hooks/UseTheme';
import HomeScreen from '../screens/HomeScreen';
import PagosScreen from '../screens/PagosScreen';
import CobrosScreen from '../screens/CobrosScreen';
import ClienteScreen from '../screens/ClienteScreen';
import DepartamentoScreen from '../screens/DepartamentoScreen';
import GastosScreen from '../screens/GastosScreen';

const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const TopTabs = () => {
  const { theme } = useTheme();
  return (
    <TopTab.Navigator
      initialRouteName="Cliente"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarIndicatorStyle: { backgroundColor: theme.colors.primary },
        tabBarStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <TopTab.Screen
        name="Cliente"
        component={ClienteScreen}
        options={{
          tabBarLabel: 'Cliente',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user" color={color} size={22} />
          ),
        }}
      />
      <TopTab.Screen
        name="Departamento"
        component={DepartamentoScreen}
        options={{
          tabBarLabel: 'Depto',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="building" color={color} size={22} />
          ),
        }}
      />

      <TopTab.Screen
        name="Gastos"
        component={GastosScreen}
        options={{
          tabBarLabel: 'Gastos',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="money-bill" color={color} size={22} />
          ),
        }}
      />
    </TopTab.Navigator>
  );
};

const BottomTabsNavigation = () => {
  const { theme } = useTheme();
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          height: 60, // Ajusta la altura aquí
          paddingBottom: 10, // Ajusta el espacio en la parte inferior si es necesario
        },
        tabBarIconStyle: { size: 22 },
        headerShown: false, // Asegúrate de que el encabezado no se muestre
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" color={color} size={22} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Pagos"
        component={PagosScreen}
        options={{
          tabBarLabel: 'Pagos',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="credit-card" color={color} size={22} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Cobros"
        component={CobrosScreen}
        options={{
          tabBarLabel: 'Cobros',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="receipt" color={color} size={22} />
          ),
        }}
      />
      <BottomTab.Screen
        name="TopTabs"
        component={TopTabs}
        options={{
          tabBarLabel: 'Más',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="th" color={color} size={22} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabsNavigation;
