import { useState, useEffect } from 'react';
import { Platform, Alert, Linking } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

// messages.ts (o directamente en el archivo del hook)
export const messages = {
  paymentReminder: "Buenos días, cuando puedo pasar?",
  energyReminder: "Buenos días, este es el recibo de luz",
  serviceAlert: "Estimado cliente, le informamos que el servicio se encuentra temporalmente fuera de servicio. Estamos trabajando para resolver el problema.",
  feedbackRequest: "Gracias por usar nuestro servicio. Por favor, déjenos sus comentarios para mejorar nuestra atención.",
};


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

type NotificationHookResult = {
  expoPushToken: string | null;
};

const useNotification = (): NotificationHookResult => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  useEffect(() => {
    const registerForPushNotificationsAsync = async (): Promise<void> => {
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          Alert.alert('Failed to get push token for push notification!');
          throw new Error('Failed to get push token for push notification!');
        }

        try {
          const expoPushTokenResponse = await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig?.extra?.eas?.projectId || '',
          });
          setExpoPushToken(expoPushTokenResponse.data);
          console.log('Expo Push Token:', expoPushTokenResponse.data);
        } catch (error) {
          Alert.alert('Failed to get Expo Push Token!');
          console.error('Error getting Expo Push Token:', error);
          throw error;
        }
      } else {
        Alert.alert('Must use a physical device for Push Notifications');
        throw new Error('Must use a physical device for Push Notifications');
      }
    };

    registerForPushNotificationsAsync();

    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const { telefono, messageType } = response.notification.request.content.data;
      if (messageType && telefono) {
        openWhatsApp(telefono, messageType);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const openWhatsApp = (telefono: string, messageType: string) => {
    const mensaje = encodeURIComponent(messages[messageType] || "Mensaje predeterminado");
    const url = `whatsapp://send?phone=${telefono}&text=${mensaje}`;

    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("WhatsApp no está instalado en tu dispositivo.");
      }
    });
  };

  return { expoPushToken };
};

export default useNotification;
