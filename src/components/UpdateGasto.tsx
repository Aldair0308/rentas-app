import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { updateGasto } from '../services/gastosService'; // Ajusta la ruta si es necesario

const UpdateGasto = ({ gasto, onGastoUpdated, onClose }) => {
  const [monto, setMonto] = useState(gasto.monto.toString()); // Mantén el monto como string para la entrada del usuario
  const [descripcion, setDescripcion] = useState(gasto.descripcion);
  const [activo, setActivo] = useState(gasto.activo);

  const handleUpdate = async () => {
    try {
      const updatedGasto = { monto: parseInt(monto, 10), descripcion, activo }; // Incluye el campo activo
      await updateGasto(gasto.id, updatedGasto); // Asegúrate de pasar el ID del gasto
      onGastoUpdated({ ...gasto, ...updatedGasto }); // Actualiza el gasto en la lista
      onClose(); // Cierra el modal
    } catch (error) {
      console.error("Error al actualizar el gasto", error);
    }
  };

  return (
    <View style={styles.modalContent}>
      <Text style={styles.title}>Actualizar Gasto</Text>
      <TextInput
        style={styles.input}
        value={monto}
        onChangeText={setMonto}
        keyboardType="numeric"
        placeholder="Monto"
      />
      <TextInput
        style={styles.input}
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Descripción"
      />
      <View style={styles.switchContainer}>
        <Text>Activo:</Text>
        <Switch
          value={activo}
          onValueChange={setActivo}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Actualizar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onClose}>
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

export default UpdateGasto;
