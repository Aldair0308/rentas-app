import React from 'react';
import { Alert } from 'react-native';
import { deletePago } from '../services/pagosService'; // Ajusta la ruta si es necesario

interface DeletePagoProps {
  id: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

const DeletePago: React.FC<DeletePagoProps> = ({ id, onSuccess, onError }) => {
  const handleDelete = async () => {
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

export default DeletePago;
