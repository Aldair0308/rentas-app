import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createPago } from '../services/pagosService'; // Ajusta la ruta si es necesario

interface CreatePagoProps {
  onPagoCreated: (pago: any) => void;
}

const CreatePago: React.FC<CreatePagoProps> = ({ onPagoCreated }) => {
  const [monto, setMonto] = useState<string>('');
  const [tipo, setTipo] = useState<string>('');
  const [depto, setDepto] = useState<string>('');
  const [cliente, setCliente] = useState<string>('');
  const [telefono, setTelefono] = useState<string>('');

  const handleCreate = async () => {
    if (!monto || !tipo || !depto || !cliente || !telefono) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    try {
      const newPago = {
        monto: parseFloat(monto),
        tipo: tipo.trim(),
        depto: depto.trim(),
        cliente: cliente.trim(),
        telefono: telefono.trim(),
      };

      const response = await createPago(newPago);
      if (onPagoCreated) onPagoCreated(response);
      Alert.alert('Éxito', 'Pago creado exitosamente.');
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al crear el pago.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Crear Nuevo Pago</Text>
        <TextInput
          style={styles.input}
          placeholder="Monto"
          keyboardType="numeric"
          value={monto}
          onChangeText={setMonto}
        />
        <TextInput
          style={styles.input}
          placeholder="Tipo"
          value={tipo}
          onChangeText={setTipo}
        />
        <TextInput
          style={styles.input}
          placeholder="Departamento"
          value={depto}
          onChangeText={setDepto}
        />
        <TextInput
          style={styles.input}
          placeholder="Cliente"
          value={cliente}
          onChangeText={setCliente}
        />
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          keyboardType="phone-pad"
          value={telefono}
          onChangeText={setTelefono}
        />
        <TouchableOpacity style={styles.button} onPress={handleCreate}>
          <Text style={styles.buttonText}>Crear Pago</Text>
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

export default CreatePago;
