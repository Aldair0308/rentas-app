import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';
import useNotification from './useNotifications'; // Asegúrate de importar el hook correctamente

const useClientStatusCheck = () => {
  const { expoPushToken } = useNotification();

  useEffect(() => {
    const checkClientStatus = async () => {
      try {
        // Realizar la solicitud GET a la API
        const response = await fetch('https://rentas-production.up.railway.app/api/v1/clientes');
        const clients = await response.json();

        // Filtrar los clientes con 'activo' en false
        const inactiveClients = clients.filter((client: { activo: boolean }) => !client.activo);

        if (inactiveClients.length > 0 && expoPushToken) {
          // Enviar notificaciones para cada cliente inactivo
          inactiveClients.forEach(async (client: { nombre: string }) => {
            const message = {
              to: expoPushToken,
              sound: 'default',
              title: 'Notificación',
              body: `El cliente ${client.nombre} necesita tu atención.`,
              data: {
                telefono: client.telefono,
                messageType: 'paymentReminder', // Cambia esto según el caso
              },
            };
            
            

            try {
              await fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
              });
            } catch (error) {
              console.error('Error al enviar la notificación:', error);
            }
          });
        } else if (inactiveClients.length === 0) {
          console.log('No hay clientes inactivos.');
        }
      } catch (error) {
        Alert.alert('Error al obtener los datos de clientes');
        console.error('Error al obtener los datos de clientes:', error);
      }
    };

    checkClientStatus();

    // Puedes configurar un intervalo para verificar el estado regularmente si lo deseas
    const intervalId = setInterval(checkClientStatus, 100000); // Ejemplo: cada 10 segundos

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, [expoPushToken]);
};

export default useClientStatusCheck;
