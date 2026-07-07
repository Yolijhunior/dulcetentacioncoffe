import React, { createContext, useReducer, ReactNode } from 'react';
import { appReducer, AppState, AppAction } from './AppReducer';

const initialState: AppState = {
  orders: [
    {
      id: '1',
      clientName: 'Mesa 4 - Familia Pérez',
      phone: '987654321',
      serviceType: 'Salón',
      priority: 'ALTA',
      description: '2 Porciones de Torta de Chocolate, 1 Capuccino Grande y 1 Milkshake de Fresa.',
      status: 'PENDIENTE',
      createdAt: '06/07/2026 13:15'
    },
    {
      id: '2',
      clientName: 'Carlos Mendoza',
      phone: '955123456',
      serviceType: 'Delivery',
      priority: 'MEDIA',
      description: '1 Tarta de Fresa entera, 6 Empanadas de Pollo y 1 Café Americano Helado.',
      status: 'EN_PROCESO',
      createdAt: '06/07/2026 13:22'
    },
    {
      id: '3',
      clientName: 'Ana Gómez',
      phone: '966789123',
      serviceType: 'Para Llevar',
      priority: 'ALTA',
      description: '1 Caja de 6 Macarons surtidos, 1 Croissant de Almendras y 1 Latte Vainilla.',
      status: 'PENDIENTE',
      createdAt: '06/07/2026 13:40'
    },
    {
      id: '4',
      clientName: 'Luis Merino',
      phone: '944321987',
      serviceType: 'Para Llevar',
      priority: 'BAJA',
      description: '2 Porciones de Cheesecake de Maracuyá y 2 tazas de Té Verde.',
      status: 'FINALIZADO',
      createdAt: '06/07/2026 13:02'
    }
  ],
  currentScreen: 'WELCOME',
  selectedOrderId: null
};

export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({ state: initialState, dispatch: () => null });

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};