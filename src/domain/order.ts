export type ServiceType = 'Salón' | 'Delivery' | 'Para Llevar';
export type PriorityType = 'BAJA' | 'MEDIA' | 'ALTA';
export type StatusType = 'PENDIENTE' | 'EN_PROCESO' | 'FINALIZADO';

export interface Order {
  id: string;
  clientName: string;     
  phone: string;           
  serviceType: ServiceType; 
  priority: PriorityType;   
  description: string;     
  status: StatusType;       
  createdAt: string;        
}