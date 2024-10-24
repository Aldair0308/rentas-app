import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createDepto } from '../services/deptosService'; // Ajusta la ruta si es necesario
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Switch } from 'react-native-gesture-handler';

const CreateDepto = ({ onDeptoCreated }) => {
  const [numero, setNumero] = useState('');
  const [precio, setPrecio] = useState('');
  const [deposito, setDeposito] = useState('');
  const [luz, setLuz] = useState('');
  const [vencimiento, setVencimiento] = useState('');
  const [activo, setActivo] = useState(true);
  const [isLuzPickerVisible, setLuzPickerVisibility] = useState(false);
  const [isVencimientoPickerVisible, setVencimientoPickerVisibility] = useState(false);

  const handleLuzConfirm = (date) => {
    setLuz(date.toISOString());
    setLuzPickerVisibility(false);
  };

  const handleVencimientoConfirm = (date) => {
    setVencimiento(date.toISOString());
    setVencimientoPickerVisibility(false);
  };

  const handleCreate = async () => {
    if (!numero || !precio || !deposito || !luz || !vencimiento) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    try {
      const newDepto = {
        numero: parseInt(numero, 10),
        precio: parseFloat(precio),
        deposito: parseInt(deposito, 10),
        luz,
        vencimiento,
        activo,
      };

      const response = await createDepto(newDepto);
      if (onDeptoCreated) onDeptoCreated(response);
      Alert.alert('Éxito', 'Departamento creado exitosamente.');
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al crear el departamento.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Crear Nuevo Departamento</Text>
        <TextInput
          style={styles.input}
          placeholder="Número"
          keyboardType="numeric"
          value={numero}
          onChangeText={setNumero}
        />
        <TextInput
          style={styles.input}
          placeholder="Precio"
          keyboardType="numeric"
          value={precio}
          onChangeText={setPrecio}
        />
        <TextInput
          style={styles.input}
          placeholder="Depósito"
          keyboardType="numeric"
          value={deposito}
          onChangeText={setDeposito}
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
        <TouchableOpacity style={styles.button} onPress={handleCreate}>
          <Text style={styles.buttonText}>Crear Departamento</Text>
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
    justifyContent: 'center',
  },
  placeholder: {
    color: '#999',
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default CreateDepto;
