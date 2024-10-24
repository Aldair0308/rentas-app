const API_URL = 'https://rentas-production.up.railway.app/api/v1/pagos';

// Función para obtener todos los pagos
export const getAllPagos = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const pagos = await response.json();
    return pagos; // Devuelve todos los pagos
  } catch (error) {
    console.error('Error fetching pagos:', error);
    return [];
  }
};

// Función para obtener pagos activos
export const getActivePagos = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const pagos = await response.json();
    // Filtrar pagos activos
    return pagos.filter(pago => pago.activo);
  } catch (error) {
    console.error('Error fetching active pagos:', error);
    return [];
  }
};

// Función para eliminar un pago
export const deletePago = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json(); // Devuelve el resultado si es necesario
  } catch (error) {
    console.error('Error deleting pago:', error);
    throw new Error('Failed to delete pago');
  }
};

// Función para crear un nuevo pago
export const createPago = async (pagoData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pagoData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json(); // Devuelve el resultado del nuevo pago
  } catch (error) {
    console.error('Error creating pago:', error);
    throw new Error('Failed to create pago');
  }
};

// Función para actualizar un pago
export const updatePago = async (id, pagoData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pagoData),
    });
    if (!response.ok) {
      const errorDetails = await response.text(); // Obtén detalles del error
      throw new Error(`Network response was not ok: ${errorDetails}`);
    }
    return await response.json(); // Devuelve el resultado del pago actualizado
  } catch (error) {
    console.error('Error updating pago:', error);
    throw new Error('Failed to update pago');
  }
};
