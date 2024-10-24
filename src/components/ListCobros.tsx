import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, ActivityIndicator, Alert, TouchableOpacity, Modal, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Importa FontAwesome
import { getActivePagos, deletePago, updatePago } from '../services/pagosService'; // Ajusta la ruta si es necesario
import CreatePago from './CreatePago'; // Ajusta la ruta si es necesario
import UpdatePago from './UpdatePago'; // Asegúrate de crear este componente

interface Pago {
  id: number;
  tipo: string;
  depto: number;
  monto: number;
  cliente: string;
  telefono: string;
  activo: boolean;
  fecha: string;
}

const ListCobros: React.FC = () => {
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState<boolean>(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState<boolean>(false);
  const [selectedPago, setSelectedPago] = useState<Pago | null>(null);

  // Función para cargar datos
  const loadPagos = async () => {
    try {
      setLoading(true);
      const data = await getActivePagos();
      // Filtrar solo los pagos de tipo 'mensualidad'
      const filteredData = data.filter(pago => pago.tipo === 'mensualidad');
      setPagos(filteredData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const openWhatsApp = (telefono: string) => {
    const url = `whatsapp://send?phone=${telefono}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("Error", "WhatsApp no está instalado en tu dispositivo.");
      }
    });
  };

  // Función para manejar el refresco de datos
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadPagos();
    setRefreshing(false);
  }, []);

  // Función para cargar más datos (si es necesario)
  const loadMorePagos = async () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);
      // Aquí podrías implementar la lógica para cargar más datos, por ejemplo:
      // const morePagos = await getMorePagos();
      // setPagos(prevPagos => [...prevPagos, ...morePagos]);
      setIsLoadingMore(false);
    }
  };

  // Función para eliminar un pago
  const handleDelete = async (id: number) => {
    Alert.alert(
      "Eliminar Pago",
      "¿Estás seguro de que deseas eliminar este pago?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              await deletePago(id);
              setPagos((prevPagos) => prevPagos.filter(pago => pago.id !== id));
            } catch (error) {
              setError("Error al eliminar el pago");
            }
          }
        }
      ]
    );
  };

  // Función para manejar la actualización de un pago
  const handlePagoUpdated = (updatedPago: Pago) => {
    setPagos(prevPagos => prevPagos.map(pago => pago.id === updatedPago.id ? updatedPago : pago));
    setIsUpdateModalVisible(false);
  };

  // Manejar la creación de un nuevo pago
  const handlePagoCreated = (newPago: Pago) => {
    setPagos(prevPagos => [newPago, ...prevPagos]);
    setIsCreateModalVisible(false);
  };

  useEffect(() => {
    loadPagos();
  }, []);

  if (loading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={pagos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.item, styles.mensualidadItem]}>
            <Text>Depto: {item.depto}</Text>
            <Text>Cliente: {item.cliente}</Text>
            <Text>Teléfono: {item.telefono}</Text>
            <Text>Monto: {item.monto}</Text>
            <Text>Tipo: {item.tipo}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.updateButton} onPress={() => {
                setSelectedPago(item);
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
            colors={['#9Bd35A', '#689F38']} // Color del indicador de carga
          />
        }
        ListFooterComponent={isLoadingMore ? <ActivityIndicator size="large" color="#0000ff" /> : null}
        onEndReached={loadMorePagos}
        onEndReachedThreshold={0.5}
      />
      {/* <TouchableOpacity style={styles.createButton} onPress={() => setIsCreateModalVisible(true)}>
        <Text style={styles.createButtonText}>Crear Pago</Text>
      </TouchableOpacity> */}
      {selectedPago && (
        <Modal
          visible={isUpdateModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsUpdateModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <UpdatePago
              pago={selectedPago}
              onPagoUpdated={handlePagoUpdated}
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
          <CreatePago onPagoCreated={handlePagoCreated} />
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
  whatsappButton: {
    backgroundColor: '#25D366',
    padding: 8,
    borderRadius: 4,
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
    borderRadius: 8,
    position: 'relative',
  },
  mensualidadItem: {
    backgroundColor: '#67bde8', // Azul para mensualidad
  },
  buttonsContainer: {
    position: 'absolute',
    right: 12,
    top: 12,
    flexDirection: 'column',
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

export default ListCobros;
