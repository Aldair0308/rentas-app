const API_URL = 'https://rentas-production.up.railway.app/api/v1/deptos';

// Función para obtener todos los departamentos activos
export const getActiveDeptos = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const deptos = await response.json();
    // Filtrar departamentos activos
    return deptos.filter(depto => depto.activo);
  } catch (error) {
    console.error('Error fetching deptos:', error);
    return [];
  }
};

// Función para eliminar un departamento
export const deleteDepto = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json(); // Devuelve el resultado si es necesario
  } catch (error) {
    console.error('Error deleting depto:', error);
    throw new Error('Failed to delete depto');
  }
};

// Función para crear un nuevo departamento
export const createDepto = async (deptoData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deptoData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json(); // Devuelve el resultado del nuevo departamento
  } catch (error) {
    console.error('Error creating depto:', error);
    throw new Error('Failed to create depto');
  }
};

// Función para actualizar un departamento
export const updateDepto = async (id: number, deptoData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deptoData),
    });
    if (!response.ok) {
      const errorDetails = await response.text(); // Obtén detalles del error
      throw new Error(`Network response was not ok: ${errorDetails}`);
    }
    return await response.json(); // Devuelve el resultado del departamento actualizado
  } catch (error) {
    console.error('Error updating depto:', error);
    throw new Error('Failed to update depto');
  }
};
