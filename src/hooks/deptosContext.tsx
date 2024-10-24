// src/hooks/deptosContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

// Define el tipo de los datos del departamento
interface Depto {
  id: number;
  numero: number;
  precio: number;
  deposito: number;
  luz: string;
  vencimiento: string;
  activo: boolean;
}

// Define el tipo del contexto
interface DeptosContextType {
  deptos: Depto[];
  loading: boolean;
  error: string | null;
}

// Valor por defecto del contexto
const DeptosContext = createContext<DeptosContextType | undefined>(undefined);

export const DeptosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [deptos, setDeptos] = useState<Depto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeptos = async () => {
      try {
        const response = await fetch('https://rentas-production.up.railway.app/api/v1/deptos');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDeptos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeptos();
  }, []);

  return (
    <DeptosContext.Provider value={{ deptos, loading, error }}>
      {children}
    </DeptosContext.Provider>
  );
};

export const useDeptos = (): DeptosContextType => {
  const context = useContext(DeptosContext);
  if (context === undefined) {
    throw new Error('useDeptos must be used within a DeptosProvider');
  }
  return context;
};
