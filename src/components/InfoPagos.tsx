import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useDeptos } from './../hooks/deptosContext';

// Función para obtener la hora en la zona horaria de CDMX
const getCDMXDate = () => {
  const offset = -6; // Offset de CDMX con respecto a UTC en horas
  const nowUTC = new Date();
  return new Date(nowUTC.getTime() + offset * 60 * 60 * 1000);
};

const InfoPagos: React.FC = () => {
  const { deptos, loading: deptosLoading, error } = useDeptos();
  const [nextPaymentDate, setNextPaymentDate] = useState<string | null>(null);

  const calculateNextPaymentDate = useCallback(() => {
    if (deptosLoading) return;

    if (error) {
      console.error('Error al cargar los datos de departamentos:', error);
      return;
    }

    const now = getCDMXDate();
    const todayDay = now.getDate();
    const todayMonth = now.getMonth();
    const todayYear = now.getFullYear();

    // Fecha para omitir
    const omitDates = [new Date(todayYear, todayMonth, todayDay), new Date(todayYear, todayMonth, todayDay + 1)];

    let earliestPaymentDate: Date | null = null;

    for (const depto of deptos) {
      const vencimientoDate = new Date(depto.vencimiento);
      vencimientoDate.setDate(vencimientoDate.getDate() + 1); // La fecha de creación es un día despues del vencimiento

      // Asegúrate de que la fecha de creación no sea hoy o mañana
      if (omitDates.some(date => date.toDateString() === vencimientoDate.toDateString())) {
        continue;
      }

      if (!earliestPaymentDate || vencimientoDate < earliestPaymentDate) {
        earliestPaymentDate = vencimientoDate;
      }
    }

    if (earliestPaymentDate) {
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      const formattedDate = earliestPaymentDate.toLocaleDateString('es-MX', options);
      setNextPaymentDate(formattedDate);
    } else {
      setNextPaymentDate(null);
    }
  }, [deptos, deptosLoading, error]);

  useEffect(() => {
    calculateNextPaymentDate();
    const intervalId = setInterval(calculateNextPaymentDate, 120000); // Actualizar cada 2 minutos

    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
  }, [calculateNextPaymentDate]);

  if (deptosLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.text}>Cargando información...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Información de Pagos</Text>
        {nextPaymentDate !== null ? (
          <Text style={styles.text}>Deberías visitar la aplicación el {nextPaymentDate} para ver el pago generado.</Text>
        ) : (
          <Text style={styles.text}>No hay información de pagos disponible o todos los vencimientos ya pasaron.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: 300,
    height: 200,
    backgroundColor: '#add8e6', // Azul claro
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Para sombra en Android
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default InfoPagos;
