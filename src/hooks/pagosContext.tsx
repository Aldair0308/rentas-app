// src/hooks/pagosContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

// Define el tipo de los datos del pago
interface Pago {
  id: number;
  monto: number;
  tipo: string;
  depto: string;
  cliente: string;
  telefono: string;
  activo: boolean;
  fecha: Date;
}

// Define el tipo del contexto
interface PagosContextType {
  pagos: Pago[];
  loading: boolean;
  error: string | null;
}

// Valor por defecto del contexto
const PagosContext = createContext<PagosContextType | undefined>(undefined);

export const PagosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        const response = await fetch('https://rentas-production.up.railway.app/api/v1/pagos');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPagos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPagos();
  }, []);

  return (
    <PagosContext.Provider value={{ pagos, loading, error }}>
      {children}
    </PagosContext.Provider>
  );
};

export const usePagos = (): PagosContextType => {
  const context = useContext(PagosContext);
  if (context === undefined) {
    throw new Error('usePagos must be used within a PagosProvider');
  }
  return context;
};
