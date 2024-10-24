import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, ActivityIndicator, Alert, TouchableOpacity, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Importa FontAwesome
import { getActiveDeptos, deleteDepto, updateDepto } from '../services/deptosService'; // Ajusta la ruta si es necesario
import CreateDepto from './CreateDepto'; // Ajusta la ruta si es necesario
import UpdateDepto from './UpdateDepto'; // Asegúrate de crear este componente

const ListDeptos = () => {
  const [deptos, setDeptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedDepto, setSelectedDepto] = useState(null);

  // Función para cargar datos
  const loadDeptos = async () => {
    try {
      setLoading(true);
      const data = await getActiveDeptos();
      setDeptos(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar el refresco de datos
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadDeptos();
    setRefreshing(false);
  }, []);

  // Función para cargar más datos (si es necesario)
  const loadMoreDeptos = async () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);
      // Aquí podrías implementar la lógica para cargar más datos
      // const moreDeptos = await getMoreDeptos();
      // setDeptos(prevDeptos => [...prevDeptos, ...moreDeptos]);
      setIsLoadingMore(false);
    }
  };

  // Función para eliminar un departamento
  const handleDelete = async (id) => {
    Alert.alert(
      "Eliminar Departamento",
      "¿Estás seguro de que deseas eliminar este departamento?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              await deleteDepto(id);
              setDeptos((prevDeptos) => prevDeptos.filter(depto => depto.id !== id));
            } catch (error) {
              setError("Error al eliminar el departamento");
            }
          }
        }
      ]
    );
  };

  // Función para manejar la actualización de un departamento
  const handleDeptoUpdated = (updatedDepto) => {
    setDeptos(prevDeptos => prevDeptos.map(depto => depto.id === updatedDepto.id ? updatedDepto : depto));
    setIsUpdateModalVisible(false);
  };

  // Manejar la creación de un nuevo departamento
  const handleDeptoCreated = (newDepto) => {
    setDeptos(prevDeptos => [newDepto, ...prevDeptos]);
    setIsCreateModalVisible(false);
  };

  useEffect(() => {
    loadDeptos();
  }, []);

  if (loading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Departamentos Activos</Text>
      <FlatList
        data={deptos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <View style={[styles.item, { backgroundColor: item.activo ? '#1E90FF' : '#FF6F6F' }]}>
            <Text>Departamento #: {item.numero}</Text>
            <Text>Precio: ${item.precio}</Text>
            <Text>Deposito: ${item.deposito}</Text>
            <Text>Fecha de Luz: {new Date(item.luz).toLocaleDateString()}</Text>
            <Text>Vencimiento: {new Date(item.vencimiento).toLocaleDateString()}</Text>
            
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.updateButton} onPress={() => {
                setSelectedDepto(item);
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
        onEndReached={loadMoreDeptos}
        onEndReachedThreshold={0.5}
      />
      <TouchableOpacity style={styles.createButton} onPress={() => setIsCreateModalVisible(true)}>
        <Text style={styles.createButtonText}>Crear Departamento</Text>
      </TouchableOpacity>
      {selectedDepto && (
        <Modal
          visible={isUpdateModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsUpdateModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <UpdateDepto
              depto={selectedDepto}
              onDeptoUpdated={handleDeptoUpdated}
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
          <CreateDepto onDeptoCreated={handleDeptoCreated} />
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
    minHeight: 130,
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

export default ListDeptos;
