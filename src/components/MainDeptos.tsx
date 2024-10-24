// src/components/MainDeptos.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useDeptos } from '../hooks/deptosContext'; // Asegúrate de ajustar la ruta según tu estructura

const MainDeptos: React.FC = () => {
  const { deptos, loading, error } = useDeptos();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Departamentos</Text>
      <FlatList
        data={deptos}
        keyExtractor={(item) => item.id.toString()} // Usa el id como clave única
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Numero: {item.numero}</Text>
            <Text>Precio: ${item.precio}</Text>
            <Text>Luz: {new Date(item.luz).toLocaleDateString()}</Text>
            <Text>Vencimiento: {new Date(item.vencimiento).toLocaleDateString()}</Text>
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

export default MainDeptos;
