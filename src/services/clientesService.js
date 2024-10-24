const API_URL = 'https://rentas-production.up.railway.app/api/v1/clientes';

// Función para obtener todos los clientes
export const getAllClientes = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const clientes = await response.json();
    return clientes;
  } catch (error) {
    console.error('Error fetching clientes:', error);
    return [];
  }
};

// Función para obtener un cliente por su ID
export const getClienteById = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const cliente = await response.json();
    return cliente;
  } catch (error) {
    console.error('Error fetching cliente:', error);
    throw new Error('Failed to fetch cliente');
  }
};

// Función para eliminar un cliente
export const deleteCliente = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json(); // Devuelve el resultado si es necesario
  } catch (error) {
    console.error('Error deleting cliente:', error);
    throw new Error('Failed to delete cliente');
  }
};

// Función para crear un nuevo cliente
export const createCliente = async (clienteData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clienteData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json(); // Devuelve el resultado del nuevo cliente
  } catch (error) {
    console.error('Error creating cliente:', error);
    throw new Error('Failed to create cliente');
  }
};

// Función para actualizar un cliente
export const updateCliente = async (id: number, clienteData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clienteData),
    });
    if (!response.ok) {
      const errorDetails = await response.text(); // Obtén detalles del error
      throw new Error(`Network response was not ok: ${errorDetails}`);
    }
    return await response.json(); // Devuelve el resultado del cliente actualizado
  } catch (error) {
    console.error('Error updating cliente:', error);
    throw new Error('Failed to update cliente');
  }
};
