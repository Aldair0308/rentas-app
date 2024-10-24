// MainPagos.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useClientes } from './../hooks/clientesContext'; // Asegúrate de ajustar la ruta según tu estructura

const MainClientes: React.FC = () => {
  const { clientes, loading, error } = useClientes();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clientes</Text>
      <FlatList
        data={clientes}
        keyExtractor={(item, index) => item.telefono} // Asegúrate de usar una clave única
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Depto: {item.depto}</Text>
            <Text>Nombre: {item.nombre}</Text>
            <Text>Telefono: {item.telefono}</Text>
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

export default MainClientes;
