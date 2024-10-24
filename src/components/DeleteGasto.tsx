import React from 'react';
import { Alert } from 'react-native';
import { deleteGasto } from '../services/gastosService'; // Ajusta la ruta si es necesario

const DeleteGasto = ({ id, onSuccess, onError }) => {
  const handleDelete = async () => {
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

export default DeleteGasto;
