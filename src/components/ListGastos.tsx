import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, ActivityIndicator, Alert, TouchableOpacity, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Importa FontAwesome
import { getActiveGastos, deleteGasto, updateGasto } from '../services/gastosService'; // Ajusta la ruta si es necesario
import CreateGasto from './CreateGasto'; // Ajusta la ruta si es necesario
import UpdateGasto from './UpdateGasto'; // Asegúrate de crear este componente

const ListGastos = () => {
  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedGasto, setSelectedGasto] = useState(null);

  // Función para cargar datos
  const loadGastos = async () => {
    try {
      setLoading(true);
      const data = await getActiveGastos();
      setGastos(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar el refresco de datos
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadGastos();
    setRefreshing(false);
  }, []);

  // Función para cargar más datos (si es necesario)
  const loadMoreGastos = async () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);
      // Aquí podrías implementar la lógica para cargar más datos, por ejemplo:
      // const moreGastos = await getMoreGastos();
      // setGastos(prevGastos => [...prevGastos, ...moreGastos]);
      setIsLoadingMore(false);
    }
  };

  // Función para eliminar un gasto
  const handleDelete = async (id) => {
    Alert.alert(
      "Eliminar Gasto",
      "¿Estás seguro de que deseas eliminar este gasto?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              await deleteGasto(id);
              setGastos((prevGastos) => prevGastos.filter(gasto => gasto.id !== id));
            } catch (error) {
              setError("Error al eliminar el gasto");
            }
          }
        }
      ]
    );
  };

  // Función para manejar la actualización de un gasto
  const handleGastoUpdated = (updatedGasto) => {
    setGastos(prevGastos => prevGastos.map(gasto => gasto.id === updatedGasto.id ? updatedGasto : gasto));
    setIsUpdateModalVisible(false);
  };

  // Manejar la creación de un nuevo gasto
  const handleGastoCreated = (newGasto) => {
    setGastos(prevGastos => [newGasto, ...prevGastos]);
    setIsCreateModalVisible(false);
  };

  useEffect(() => {
    loadGastos();
  }, []);

  if (loading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gastos Activos</Text>
      <FlatList
        data={gastos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>$ {item.monto}</Text>
            <Text>{item.descripcion}</Text>
            <Text>Fecha: {new Date(item.fecha).toLocaleDateString()}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                <FontAwesome name="trash" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.updateButton} onPress={() => {
                setSelectedGasto(item);
                setIsUpdateModalVisible(true);
              }}>
                <FontAwesome name="edit" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#9Bd35A', '#689F38']} // Color del indicador de carga
          />
        }
        ListFooterComponent={isLoadingMore ? <ActivityIndicator size="large" color="#0000ff" /> : null}
        onEndReached={loadMoreGastos}
        onEndReachedThreshold={0.5}
      />
      <TouchableOpacity style={styles.createButton} onPress={() => setIsCreateModalVisible(true)}>
        <Text style={styles.createButtonText}>Crear Gasto</Text>
      </TouchableOpacity>
      {selectedGasto && (
        <Modal
          visible={isUpdateModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsUpdateModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <UpdateGasto
              gasto={selectedGasto}
              onGastoUpdated={handleGastoUpdated}
              onClose={() => setIsUpdateModalVisible(false)}
            />
          </View>
        </Modal>
      )}
      <Modal
        visible={isCreateModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsCreateModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <CreateGasto onGastoCreated={handleGastoCreated} />
        </View>
      </Modal>
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
    minHeight: 110,
    minWidth: 250,
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    position: 'relative',
  },
  buttonsContainer: {
    position: 'absolute',
    right: 12,
    top: 12,
    flexDirection: 'column',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    padding: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 4,
  },
  createButton: {
    padding: 16,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente para el modal
    padding: 20,
  },
});

export default ListGastos;
