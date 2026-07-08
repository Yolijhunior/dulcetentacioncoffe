import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../infrastructure/AppContext';
import { Order } from '../../domain/order';

export const useHome = () => {
  const { state, dispatch } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  const handleSelectOrder = (order: Order) => {
    dispatch({ 
      type: 'SET_CURRENT_ORDER' as any, 
      payload: order as any 
    });
    dispatch({ 
      type: 'NAVIGATE' as any, 
      payload: { screen: 'DETAIL' } as any 
    });
  };

  const handleNavigateToCreate = () => {
    dispatch({ type: 'NAVIGATE' as any, payload: { screen: 'CREATE' } as any });
  };

  return {
    orders: state.orders,
    isLoading,
    handleSelectOrder,
    handleNavigateToCreate
  };
};