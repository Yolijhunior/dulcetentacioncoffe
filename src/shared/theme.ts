import { StatusType, PriorityType, ServiceType } from '../domain/order';

export const theme = {
  colors: {
    primary: '#5C3A21',       
    primaryLight: '#795548',  
    background: '#FCF9F6',    
    surface: '#FFFFFF',       
    border: '#EFEBE9',        
    textPrimary: '#3E2723',   
    textSecondary: '#5D4037', 
    textMuted: '#A1887F',     
    textWhite: '#FFFFFF',
    status: {
      PENDIENTE: '#D97706',   
      EN_PROCESO: '#3B82F6',  
      FINALIZADO: '#10B981',  
    } as Record<StatusType, string>,
    priority: {
      BAJA: '#84CC16',        
      MEDIA: '#F59E0B',       
      ALTA: '#EF4444',       
    } as Record<PriorityType, string>,
    services: {
      'Salón': '#10B981',       
      'Delivery': '#3B82F6',    
      'Para Llevar': '#8B5CF6',  
    } as Record<ServiceType, string>,
    actionBlue: '#1E40AF',
    actionRed: '#EF4444'
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
  }
};
export type Theme = typeof theme;