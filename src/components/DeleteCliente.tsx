import React from 'react';
import { Alert } from 'react-native';
import { deleteCliente } from '../services/clientesService'; // Ajusta la ruta si es necesario

const DeleteCliente = ({ id, onSuccess, onError }) => {
  const handleDelete = async () => {
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
              onSuccess();
            } catch (error) {
              onError(error.message);
            }
          }
        }
      ]
    );
  };

  React.useEffect(() => {
    handleDelete();
  }, []);

  return null;
};

export default DeleteCliente;
