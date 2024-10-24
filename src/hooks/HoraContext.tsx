import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface HoraContextType {
  hora: string;
  fecha: string;
}

const HoraContext = createContext<HoraContextType | undefined>(undefined);

const HoraProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [hora, setHora] = useState<string>('');
  const [fecha, setFecha] = useState<string>('');

  useEffect(() => {
    const updateHoraYFecha = () => {
      const now = new Date();
      setHora(now.toLocaleTimeString());
      setFecha(now.toLocaleDateString());
    };

    updateHoraYFecha(); // Inicializar al montar el componente

    const intervalId = setInterval(updateHoraYFecha, 1000); // Actualiza cada segundo

    return () => clearInterval(intervalId); // Cleanup interval al desmontar el componente
  }, []);

  return (
    <HoraContext.Provider value={{ hora, fecha }}>
      {children}
    </HoraContext.Provider>
  );
};

const useHora = (): HoraContextType => {
  const context = useContext(HoraContext);
  if (!context) {
    throw new Error('useHora debe ser usado dentro de un HoraProvider');
  }
  return context;
};

export { HoraProvider, useHora };
