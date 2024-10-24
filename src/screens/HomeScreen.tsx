import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HoraActual from '../components/HoraActual';
import InfoPagos from '../components/InfoPagos';
import useNotification from './../hooks/useNotifications';
import { useTheme } from './../hooks/UseTheme';

const HomeScreen = () => {
  const { expoPushToken } = useNotification();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { theme } = useTheme();

  // LLamamos la función de el cobro de la luz
  // useCreatePagoLuz();

  // Llama al hook para revisar el estado de los clientes
  // useClientStatusCheck();

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

    // Llama al hook para iniciar la comprobación y creación de pagos periódicamente
    // useCreatePago();

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
      <Text style={[theme.styles.text, {fontSize: 40}]} >Casa</Text>
      <View style={[theme.styles.containerSet, { paddingHorizontal: 20, paddingTop: 20 }]}>
        <HoraActual/>
        {/* <MainPagos/> */}
        {/* <MainDeptos/> */}
        {/* <MainClientes/> */}
        <InfoPagos/>
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

export default HomeScreen;
