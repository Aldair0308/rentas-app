import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { updatePago } from '../services/pagosService'; // Ajusta la ruta si es necesario
import { Switch } from 'react-native-gesture-handler';

interface UpdatePagoProps {
  pago: any;
  onPagoUpdated: (pago: any) => void;
  onClose: () => void;
}

const UpdatePago: React.FC<UpdatePagoProps> = ({ pago, onPagoUpdated, onClose }) => {
  const [monto] = useState<string>(pago.monto.toString());
  const [tipo] = useState<string>(pago.tipo);
  const [depto] = useState<string>(pago.depto);
  const [cliente] = useState<string>(pago.cliente);
  const [telefono] = useState<string>(pago.telefono);
  const [activo, setActivo] = useState<boolean>(pago.activo);

  const handleUpdate = async (newActivo: boolean) => {
    try {
      const updatedPago = { monto: parseFloat(monto), tipo, depto, cliente, telefono, activo: newActivo };
      await updatePago(pago.id, updatedPago);
      onPagoUpdated({ ...pago, ...updatedPago });
      onClose();
    } catch (error) {
      console.error("Error al actualizar el pago", error);
    }
  };

  const handleCobrar = () => {
    Alert.alert(
      'Confirmación',
      `Has recibido el monto de ${monto}. ¿Deseas continuar?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sí',
          onPress: async () => {
            try {
              await handleUpdate(false); // Enviar "activo": false
            } catch (error) {
              console.error("Error al cobrar el pago", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Detalles del Pago</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Monto:</Text>
        <Text style={styles.value}>{monto}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Tipo:</Text>
        <Text style={styles.value}>{tipo}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Departamento:</Text>
        <Text style={styles.value}>{depto}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Cliente:</Text>
        <Text style={styles.value}>{cliente}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Teléfono:</Text>
        <Text style={styles.value}>{telefono}</Text>
      </View>

      {/* Switch oculto */}
      <View style={styles.hiddenSwitchContainer}>
        <Switch value={activo} onValueChange={setActivo} style={{ display: 'none' }} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCobrar}>
        <Text style={styles.buttonText}>Cobrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginVertical: 20,
    width: '90%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  infoContainer: {
    width: '100%',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 5,
    marginTop: 15,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  hiddenSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    display: 'none', // Ocultar el Switch
  },
});

export default UpdatePago;
