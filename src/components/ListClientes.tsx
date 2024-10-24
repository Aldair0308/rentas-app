import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, ActivityIndicator, Alert, TouchableOpacity, Modal, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { getAllClientes, deleteCliente, updateCliente } from '../services/clientesService';
import CreateCliente from './CreateCliente';
import UpdateCliente from './UpdateCliente';

const ListClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);

  const loadClientes = async () => {
    try {
      setLoading(true);
      const data = await getAllClientes();
      setClientes(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadClientes();
    setRefreshing(false);
  }, []);

  const loadMoreClientes = async () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);
      // Aquí podrías implementar la lógica para cargar más datos
      setIsLoadingMore(false);
    }
  };

  const handleDelete = async (id) => {
    Alert.alert(
      "Eliminar Cliente",
      "¿Estás seguro de que deseas eliminar este cliente?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              await deleteCliente(id);
              setClientes(prevClientes => prevClientes.filter(cliente => cliente.id !== id));
              alert(`El cliente ha sido eliminado`);
            } catch (error) {
              alert(`Error: ${error.message}`);
            }
          }
        }
      ]
    );
  };

  const handleClienteUpdated = (updatedCliente) => {
    setClientes(prevClientes => prevClientes.map(cliente => cliente.id === updatedCliente.id ? updatedCliente : cliente));
    setIsUpdateModalVisible(false);
  };

  const handleClienteCreated = (newCliente) => {
    setClientes(prevClientes => [newCliente, ...prevClientes]);
    setIsCreateModalVisible(false);
  };

  const openWhatsApp = (telefono) => {
    const url = `whatsapp://send?phone=${telefono}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        alert("WhatsApp no está instalado en tu dispositivo.");
      }
    });
  };

  useEffect(() => {
    loadClientes();
  }, []);

  if (loading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Fecha Inválida";
    return date.toLocaleDateString();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clientes</Text>
      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: item.activo ? '#1E90FF' : '#FF6F6F' }]}>
            <Text>Nombre: {item.nombre}</Text>
            <Text>No Depto: {item.depto}</Text>
            <Text>tel: {item.telefono}</Text>
            <Text>Registrado: {formatDate(item.fecha)}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.updateButton} onPress={() => {
                setSelectedCliente(item);
                setIsUpdateModalVisible(true);
              }}>
                <FontAwesome name="edit" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.whatsappButton} onPress={() => openWhatsApp(item.telefono)}>
                <FontAwesome name="whatsapp" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#9Bd35A', '#689F38']}
          />
        }
        ListFooterComponent={isLoadingMore ? <ActivityIndicator size="large" color="#0000ff" /> : null}
        onEndReached={loadMoreClientes}
        onEndReachedThreshold={0.5}
      />
      <TouchableOpacity style={styles.createButton} onPress={() => setIsCreateModalVisible(true)}>
        <Text style={styles.createButtonText}>Crear Cliente</Text>
      </TouchableOpacity>
      {selectedCliente && (
        <Modal
          visible={isUpdateModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsUpdateModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <UpdateCliente
              cliente={selectedCliente}
              onClienteUpdated={handleClienteUpdated}
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
          <CreateCliente onClienteCreated={handleClienteCreated} />
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
    minHeight: 110,  // Incrementé la altura para acomodar el nuevo botón
    minWidth: 250,
    marginBottom: 12,
    padding: 12,
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
    marginBottom: 4,  // Añadí un margen inferior para separar los botones
  },
  whatsappButton: {
    backgroundColor: '#25D366',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
});

export default ListClientes;
