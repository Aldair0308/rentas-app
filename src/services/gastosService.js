const API_URL = 'https://rentas-production.up.railway.app/api/v1/gastos';

// Función para obtener gastos activos
export const getActiveGastos = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const gastos = await response.json();
    // Filtrar gastos activos
    return gastos.filter(gasto => gasto.activo);
  } catch (error) {
    console.error('Error fetching gastos:', error);
    return [];
  }
};

// Función para eliminar un gasto
export const deleteGasto = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json(); // Devuelve el resultado si es necesario
  } catch (error) {
    console.error('Error deleting gasto:', error);
    throw new Error('Failed to delete gasto');
  }
};

// Función para crear un nuevo gasto
export const createGasto = async (gastoData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gastoData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json(); // Devuelve el resultado del nuevo gasto
  } catch (error) {
    console.error('Error creating gasto:', error);
    throw new Error('Failed to create gasto');
  }
};

// Función para actualizar un gasto
export const updateGasto = async (id: number, gastoData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gastoData),
      });
      if (!response.ok) {
        const errorDetails = await response.text(); // Obtén detalles del error
        throw new Error(`Network response was not ok: ${errorDetails}`);
      }
      return await response.json(); // Devuelve el resultado del gasto actualizado
    } catch (error) {
      console.error('Error updating gasto:', error);
      throw new Error('Failed to update gasto');
    }
  };
  
