// src/components/MainPagos.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { usePagos } from './../hooks/pagosContext'; // Asegúrate de ajustar la ruta según tu estructura

const MainPagos: React.FC = () => {
  const { pagos, loading, error } = usePagos();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagos</Text>
      <FlatList
        data={pagos}
        keyExtractor={(item) => item.id.toString()} // Usa el id como clave única
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Monto: ${item.monto}</Text>
            <Text>Tipo: {item.tipo}</Text>
            <Text>Depto: {item.depto}</Text>
            <Text>Cliente: {item.cliente}</Text>
            <Text>Telefono: {item.telefono}</Text>
            <Text>Activo: {item.activo ? 'Sí' : 'No'}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    marginBottom: 12,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default MainPagos;
