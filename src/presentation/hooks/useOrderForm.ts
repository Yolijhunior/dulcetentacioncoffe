import { useState, useContext } from 'react';
import { Alert } from 'react-native';
import { AppContext } from '../../infrastructure/AppContext';
import { ServiceType, PriorityType } from '../../domain/order';
import { validateOrderForm } from '../../shared/validations';

export const useOrderForm = () => {
  const { dispatch } = useContext(AppContext);
  const [form, setForm] = useState({ clientName: '', phone: '', description: '' });
  const [serviceType, setServiceType] = useState<ServiceType>('Salón');
  const [priority, setPriority] = useState<PriorityType>('MEDIA');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSave = () => {
    const newErrors = validateOrderForm(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    const newOrder = {
      id: Date.now().toString(),
      clientName: form.clientName.trim(),
      phone: form.phone.trim(),
      serviceType,
      priority,
      description: form.description.trim(),
      status: 'PENDIENTE' as const,
      createdAt: new Date().toLocaleString('es-PE', { 
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false 
      })
    };

    dispatch({ type: 'ADD_ORDER', payload: newOrder });
    Alert.alert('Éxito 🧁', 'Pedido enviado correctamente a la cocina.');
    dispatch({ type: 'NAVIGATE', payload: { screen: 'HOME' } });
  };

  const handleCancel = () => {
    dispatch({ type: 'NAVIGATE', payload: { screen: 'HOME' } });
  };

  return {
    form,
    setForm,
    serviceType,
    setServiceType,
    priority,
    setPriority,
    errors,
    handleSave,
    handleCancel
  };
};