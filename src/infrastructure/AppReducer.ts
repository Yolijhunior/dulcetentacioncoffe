import { Order } from '../domain/order';

export interface AppState {
  orders: Order[];
  currentScreen: 'WELCOME' | 'HOME' | 'CREATE' | 'DETAIL';
  selectedOrderId: string | null;
}

export type AppAction =
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER'; payload: Order }
  | { type: 'DELETE_ORDER'; payload: string }
  | { type: 'NAVIGATE'; payload: { screen: AppState['currentScreen']; id?: string | null } };

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_ORDER':
      return { ...state, orders: [action.payload, ...state.orders] };
    case 'UPDATE_ORDER':
      return {
        ...state,
        orders: state.orders.map(order => order.id === action.payload.id ? action.payload : order)
      };
    case 'DELETE_ORDER':
      return {
        ...state,
        orders: state.orders.filter(order => order.id !== action.payload)
      };
    case 'NAVIGATE':
      return {
        ...state,
        currentScreen: action.payload.screen,
        selectedOrderId: action.payload.id || null
      };
    default:
      return state;
  }
};