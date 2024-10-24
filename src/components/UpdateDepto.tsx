import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { updateDepto, deleteDepto } from '../services/deptosService'; // Ajusta la ruta si es necesario

interface Depto {
  id: number;
  numero: number;
  precio: number;
  deposito: number;
  luz: string;
  vencimiento: string;
  activo: boolean;
}

interface UpdateDeptoProps {
  depto: Depto;
  onDeptoUpdated: (depto: Depto) => void;
  onDeptoDeleted: () => void;
  onClose: () => void;
}

const UpdateDepto: React.FC<UpdateDeptoProps> = ({ depto, onDeptoUpdated, onClose, onDeptoDeleted }) => {
  const [numero, setNumero] = useState<string>(depto.numero.toString());
  const [precio, setPrecio] = useState<string>(depto.precio.toString());
  const [deposito, setDeposito] = useState<string>(depto.deposito.toString());
  const [luz, setLuz] = useState<string>(depto.luz);
  const [vencimiento, setVencimiento] = useState<string>(depto.vencimiento);
  const [activo, setActivo] = useState<boolean>(depto.activo);

  const [isLuzPickerVisible, setLuzPickerVisibility] = useState<boolean>(false);
  const [isVencimientoPickerVisible, setVencimientoPickerVisibility] = useState<boolean>(false);

  const handleLuzConfirm = (date: Date) => {
    setLuz(date.toISOString());
    setLuzPickerVisibility(false);
  };

  const handleVencimientoConfirm = (date: Date) => {
    setVencimiento(date.toISOString());
    setVencimientoPickerVisibility(false);
  };

  const handleUpdate = async () => {
    try {
      const updatedDepto = { 
        numero: parseInt(numero, 10), 
        precio: parseFloat(precio), 
        deposito: parseInt(deposito, 10),
        luz, 
        vencimiento,
        activo 
      };
      const response = await updateDepto(depto.id, updatedDepto);
      onDeptoUpdated(response); // Utiliza la respuesta del servidor para actualizar el depto
      onClose();
    } catch (error) {
      console.error("Error al actualizar el departamento", error);
    }
  };

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
              await deleteDepto(depto.id);
              onDeptoDeleted();
              onClose();
            } catch (error) {
              console.error("Error al eliminar el departamento", error);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.modalContent}>
      <Text style={styles.title}>Actualizar Departamento</Text>
      <TextInput
        style={styles.input}
        value={numero}
        onChangeText={setNumero}
        keyboardType="numeric"
        placeholder="Número"
      />
      <TextInput
        style={styles.input}
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
        placeholder="Precio"
      />
      <TextInput
        style={styles.input}
        value={deposito}
        onChangeText={setDeposito}
        keyboardType="numeric"
        placeholder="Depósito"
      />
      <TouchableOpacity style={styles.input} onPress={() => setLuzPickerVisibility(true)}>
        <Text style={styles.placeholder}>{luz ? new Date(luz).toDateString() : 'Fecha Luz (ISO 8601)'}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isLuzPickerVisible}
        mode="date"
        onConfirm={handleLuzConfirm}
        onCancel={() => setLuzPickerVisibility(false)}
      />
      <TouchableOpacity style={styles.input} onPress={() => setVencimientoPickerVisibility(true)}>
        <Text style={styles.placeholder}>{vencimiento ? new Date(vencimiento).toDateString() : 'Fecha Vencimiento (ISO 8601)'}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isVencimientoPickerVisible}
        mode="date"
        onConfirm={handleVencimientoConfirm}
        onCancel={() => setVencimientoPickerVisibility(false)}
      />
      <View style={styles.switchContainer}>
        <Text>Activo:</Text>
        <Switch
          value={activo}
          onValueChange={setActivo}
        />
      </View>
      <TouchableOpacity style={[styles.button, { backgroundColor: 'blue' }]} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Actualizar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={handleDelete}>
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: "#123456" }]} onPress={onClose}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  placeholder: {
    color: '#999',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UpdateDepto;
