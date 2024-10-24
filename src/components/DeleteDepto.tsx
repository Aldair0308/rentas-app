import React from 'react';
import { Alert } from 'react-native';
import { deleteDepto } from '../services/deptosService'; // Ajusta la ruta si es necesario

interface DeleteDeptoProps {
  id: number;
  onSuccess: () => void;
  onError: (message: string) => void;
}

const DeleteDepto: React.FC<DeleteDeptoProps> = ({ id, onSuccess, onError }) => {
  const handleDelete = async () => {
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

export default DeleteDepto;
