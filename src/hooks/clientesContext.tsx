// clientesContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

// Define el tipo de los datos del cliente
interface Cliente {
  depto: number;
  nombre: string;
  telefono: string;
}

// Define el tipo del contexto
interface ClientesContextType {
  clientes: Cliente[];
  loading: boolean;
  error: string | null;
}

// Valor por defecto del contexto
const ClientesContext = createContext<ClientesContextType | undefined>(undefined);

export const ClientesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch('https://rentas-production.up.railway.app/api/v1/clientes');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setClientes(data.map(({ depto, nombre, telefono }: any) => ({ depto, nombre, telefono })));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  return (
    <ClientesContext.Provider value={{ clientes, loading, error }}>
      {children}
    </ClientesContext.Provider>
  );
};

export const useClientes = (): ClientesContextType => {
  const context = useContext(ClientesContext);
  if (context === undefined) {
    throw new Error('useClientes must be used within a ClientesProvider');
  }
  return context;
};
