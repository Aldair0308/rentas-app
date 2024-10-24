import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import { updateCliente, deleteCliente } from '../services/clientesService'; // Ajusta la ruta si es necesario

interface Cliente {
  id: number;
  nombre: string;
  telefono: string;
  depto: number;
  activo: boolean;
}

interface UpdateClienteProps {
  cliente: Cliente;
  onClienteUpdated: (cliente: Cliente) => void;
  onClienteDeleted: () => void;
  onClose: () => void;
}

const UpdateCliente: React.FC<UpdateClienteProps> = ({ cliente, onClienteUpdated, onClose, onClienteDeleted }) => {
  const [nombre, setNombre] = useState<string>(cliente.nombre);
  const [telefono, setTelefono] = useState<string>(cliente.telefono);
  const [depto, setDepto] = useState<string>(cliente.depto.toString());
  const [activo, setActivo] = useState<boolean>(cliente.activo);

  const handleUpdate = async () => {
    try {
      const updatedCliente = { 
        nombre, 
        telefono, 
        depto: parseInt(depto, 10), 
        activo 
      };
      const response = await updateCliente(cliente.id, updatedCliente);
      onClienteUpdated(response); // Utiliza la respuesta del servidor para actualizar el cliente
      onClose();
    } catch (error) {
      console.error("Error al actualizar el cliente", error);
    }
  };

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
              await deleteCliente(cliente.id);
              onClienteDeleted();
              onClose();
            } catch (error) {
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.modalContent}>
      <Text style={styles.title}>Actualizar Cliente</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre"
      />
      <TextInput
        style={styles.input}
        value={telefono}
        onChangeText={setTelefono}
        placeholder="Teléfono"
      />
      <TextInput
        style={styles.input}
        value={depto}
        onChangeText={setDepto}
        keyboardType="numeric"
        placeholder="Departamento"
      />
      <View style={styles.switchContainer}>
        <Text>Activo:</Text>
        <Switch
          value={activo}
          onValueChange={setActivo}
        />
      </View>
      <TouchableOpacity style={[styles.button, { backgroundColor: 'blue', }]} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Actualizar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: 'red', }]} onPress={handleDelete}>
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

export default UpdateCliente;
