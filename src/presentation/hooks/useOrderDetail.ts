import { useContext } from 'react';
import { Alert } from 'react-native';
import { AppContext } from '../../infrastructure/AppContext';
import { StatusType, Order } from '../../domain/order';

export const useOrderDetail = (order: Order | undefined) => {
  const { dispatch } = useContext(AppContext);

  const handleUpdateStatus = (newStatus: StatusType) => {
    if (!order) return;
    dispatch({ 
      type: 'UPDATE_STATUS' as any, 
      payload: { id: order.id, status: newStatus } as any 
    });
    
    Alert.alert('Estado Actualizado 🧑‍🍳', `La orden ahora está en estado: ${newStatus}`);
    dispatch({ type: 'NAVIGATE' as any, payload: { screen: 'HOME' } as any });
  };

  const handleDeleteOrder = () => {
    if (!order) return;
    Alert.alert(
      'Eliminar Pedido 🗑️',
      '¿Estás seguro de que deseas remover esta comanda del sistema?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive', 
          onPress: () => {
            dispatch({ type: 'DELETE_ORDER' as any, payload: order.id as any });
            dispatch({ type: 'NAVIGATE' as any, payload: { screen: 'HOME' } as any });
          } 
        }
      ]
    );
  };

  const handleGoBack = () => {
    dispatch({ type: 'NAVIGATE' as any, payload: { screen: 'HOME' } as any });
  };

  return {
    handleUpdateStatus,
    handleDeleteOrder,
    handleGoBack
  };
};