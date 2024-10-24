import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createGasto } from '../services/gastosService'; // Ajusta la ruta si es necesario

const CreateGasto = ({ onGastoCreated }) => {
  const [monto, setMonto] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleCreate = async () => {
    if (!monto || !descripcion) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    try {
      const newGasto = {
        monto: parseFloat(monto),
        descripcion: descripcion.trim(),
      };

      const response = await createGasto(newGasto);
      if (onGastoCreated) onGastoCreated(response);
      Alert.alert('Éxito', 'Gasto creado exitosamente.');
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al crear el gasto.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Crear Nuevo Gasto</Text>
        <TextInput
          style={styles.input}
          placeholder="Monto"
          keyboardType="numeric"
          value={monto}
          onChangeText={setMonto}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          value={descripcion}
          onChangeText={setDescripcion}
        />
        <TouchableOpacity style={styles.button} onPress={handleCreate}>
          <Text style={styles.buttonText}>Crear Gasto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '',
  },
  formContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    elevation: 5, // Para sombra en Android
    shadowColor: '#000', // Para sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#fafafa',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CreateGasto;
