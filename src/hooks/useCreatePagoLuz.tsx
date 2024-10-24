import { useEffect, useCallback, useRef, useState } from 'react';
import { useClientes } from './clientesContext';
import { useDeptos } from './deptosContext';
import { usePagos } from './pagosContext';
import useNotification from './useNotifications';

const useCreatePagoLuzPar = () => {
  const { clientes, loading: clientesLoading } = useClientes();
  const { deptos, loading: deptosLoading } = useDeptos();
  const { pagos, loading: pagosLoading } = usePagos();
  const isCreatingPago = useRef(false); // Ref para controlar si ya se está creando un pago
  const [isReady, setIsReady] = useState(false); // Estado para controlar si los contextos están listos
  const { expoPushToken } = useNotification(); // Hook para notificaciones

  const createPagoLuzPar = useCallback(async () => {
    if (isCreatingPago.current) return; // Evitar ejecutar si ya está en curso
    isCreatingPago.current = true; // Marcar como en curso

    const now = new Date();
    const todayDay = now.getDate(); // Obtener solo el día de la fecha actual
    const currentMonth = now.getMonth() + 1; // Obtener el mes actual (0-indexado, por lo que sumamos 1)

    // Verificar si el mes actual es par
    if (currentMonth % 2 !== 0) {
      console.log('Los pagos de luz solo se realizan en meses pares.');
      isCreatingPago.current = false;
      return;
    }

    for (const cliente of clientes) {
      const depto = deptos.find(d => d.numero === cliente.depto);

      if (!depto) continue;

      const vencimientoDate = new Date(depto.luz);
      const vencimientoDay = vencimientoDate.getDate(); // Obtener solo el día de la fecha de vencimiento

      // Verificar si hoy es un día despues del vencimiento
      if (todayDay !== vencimientoDay + 1) continue;

      const existingPago = pagos.find(p => {
        const pagoDate = new Date(p.fecha);
        return (
          p.cliente === cliente.nombre &&
          p.tipo === 'luz' &&
          pagoDate.getDate() === todayDay && // Comparar solo el día
          pagoDate.getMonth() === now.getMonth() // Asegurarse de que es el mismo mes
        );
      });

      if (existingPago) continue;

      const newPago = {
        monto: 100,  // Monto fijo de 100
        tipo: 'luz',  // Tipo de pago 'luz'
        depto: String(depto.numero),
        cliente: cliente.nombre,
        telefono: cliente.telefono
      };

      try {
        const response = await fetch('https://rentas-production.up.railway.app/api/v1/pagos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newPago)
        });

        const responseBody = await response.text();
        if (!response.ok) {
          throw new Error(`Error al crear el pago de luz: ${responseBody}`);
        }

        const result = JSON.parse(responseBody);
        console.log('Pago de luz creado exitosamente:', result);

        // Enviar notificación
        if (expoPushToken) {
          const message = {
            to: expoPushToken,
            sound: 'default',
            title: 'Cobro de Luz',
            body: `El cobro de la luz del departamento de ${cliente.nombre} se requiere.`,
            data: {
              telefono: cliente.telefono,
              messageType: 'paymentReminder', // Cambia esto según el tipo de mensaje que quieras enviar
            },
          };

          await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
          });
        }
      } catch (error) {
        console.error('Error al crear el pago de luz:', error.message);
      }
    }

    isCreatingPago.current = false; // Marcar como no en curso después de completar
  }, [clientes, deptos, pagos, expoPushToken]);

  useEffect(() => {
    if (!clientesLoading && !deptosLoading && !pagosLoading) {
      setIsReady(true);
    }
  }, [clientesLoading, deptosLoading, pagosLoading]);

  useEffect(() => {
    if (isReady) {
      const timerId = setTimeout(() => {
        createPagoLuzPar();
      }, 5000); // Esperar 5 segundos

      return () => clearTimeout(timerId); // Limpiar el temporizador si el componente se desmonta
    }
  }, [isReady, createPagoLuzPar]);

  return {};
};

export default useCreatePagoLuzPar;
