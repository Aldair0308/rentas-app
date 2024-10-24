import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); // Obtén el ancho de la pantalla

const HoraDisplay: React.FC = () => {
  const [hora, setHora] = useState<string>('');
  const [fecha, setFecha] = useState<string>('');

  // Función para actualizar la hora y la fecha
  const updateHora = () => {
    const now = new Date();
    
    // Convertir la hora a la zona horaria de CDMX (UTC-6)
    const options = { timeZone: 'America/Mexico_City', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const timeString = new Intl.DateTimeFormat('es-MX', options).format(now);

    // Obtener la fecha en formato de texto
    const dateString = new Intl.DateTimeFormat('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(now);

    setHora(timeString);
    setFecha(dateString);
  };

  // Actualizar la hora cada segundo
  useEffect(() => {
    updateHora(); // Inicializar la hora
    const interval = setInterval(updateHora, 1000); // Actualizar cada segundo
    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.hora}>{hora}</Text>
      <Text style={styles.fecha}>{fecha}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000', // Fondo negro para simular un reloj digital
    padding: 20,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: '#444', // Color del borde similar a un marco de reloj
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 8,
  },
  hora: {
    fontSize: width * 0.1, // Ajusta el tamaño de la fuente basado en el ancho de la pantalla
    color: '#0ff', // Color azul claro típico de un reloj digital
    fontFamily: 'monospace', // Usar una fuente monoespaciada para un look más digital
    letterSpacing: 2,
    textAlign: 'center', // Asegura que el texto esté centrado
  },
  fecha: {
    fontSize: width * 0.05, // Ajusta el tamaño de la fuente basado en el ancho de la pantalla
    color: '#0ff',
    fontFamily: 'monospace',
    marginTop: 10,
    textAlign: 'center', // Asegura que el texto esté centrado
  },
});

export default HoraDisplay;
