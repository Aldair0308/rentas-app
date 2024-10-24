import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './src/navigation/DrawerNavigation';
import { ThemeProvider } from './src/hooks/ThemeProvider'; 
import useNotification from './src/hooks/useNotifications';
import { ClientesProvider } from './src/hooks/clientesContext'; // Importa el ClientesProvider
import { DeptosProvider } from './src/hooks/deptosContext'; // Importa el DeptosProvider
import { HoraProvider } from './src/hooks/HoraContext'; // Importa el HoraProvider
import { PagosProvider } from './src/hooks/pagosContext';

const App = () => {
  // Usa el hook para solicitar permisos y obtener el token
  const { expoPushToken } = useNotification();

  // Puedes utilizar el expoPushToken para enviar notificaciones o almacenar el token


  return (
    <ThemeProvider>
      <PagosProvider>
        <ClientesProvider>
          <DeptosProvider>
            <HoraProvider>
              <NavigationContainer>
                <DrawerNavigation />
              </NavigationContainer>
            </HoraProvider>
          </DeptosProvider>
        </ClientesProvider>
      </PagosProvider>
    </ThemeProvider>
  );
};

export default App;
