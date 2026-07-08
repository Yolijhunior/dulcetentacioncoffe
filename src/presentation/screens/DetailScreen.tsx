import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { AppContext } from '../../infrastructure/AppContext';
import { CustomInput } from '../components/CustomInput';
import { theme } from '../../shared/theme';
import { StatusType, PriorityType } from '../../domain/order';
import { validateOrderForm } from '../../shared/validations';

export const DetailScreen = () => {
  const { state, dispatch } = useContext(AppContext);
  const order = state.orders.find(o => o.id === state.selectedOrderId) || (state as any)._currentOrderBackup;

  if (!order) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTextMsg}>Error: El pedido no fue localizado. 🥧</Text>
      </View>
    );
  }

  const [description, setDescription] = useState(order.description);
  const [status, setStatus] = useState<StatusType>(order.status);
  const [priority, setPriority] = useState<PriorityType>(order.priority);
  const [errorDesc, setErrorDesc] = useState('');

  const handleUpdate = () => {
    const validationErrors = validateOrderForm({
      clientName: order.clientName, 
      phone: order.phone,
      description: description
    });

    if (validationErrors.description) {
      setErrorDesc(validationErrors.description);
      Alert.alert('Atención ⚠️', validationErrors.description);
      return;
    }

    setErrorDesc('');
    const updatedOrder = { ...order, description: description.trim(), status, priority };
    dispatch({ type: 'UPDATE_ORDER', payload: updatedOrder });
    Alert.alert('Actualizado ✅', 'El pedido se ha modificado con éxito.');
    dispatch({ type: 'NAVIGATE', payload: { screen: 'HOME' } });
  };

  const handleDelete = () => {
    Alert.alert(
      '¿Eliminar Pedido? 🚨',
      `Esta acción removerá permanentemente el pedido de "${order.clientName}".`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive', 
          onPress: () => {
            dispatch({ type: 'DELETE_ORDER', payload: order.id });
            dispatch({ type: 'NAVIGATE', payload: { screen: 'HOME' } });
          } 
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>Modificar Pedido</Text>
      <Text style={styles.meta}>Servicio: {order.serviceType} | Registrado: {order.createdAt}</Text>

      <CustomInput label="Cliente / Mesa" value={order.clientName} onChangeText={() => {}} placeholder="" editable={false} />
      
      <CustomInput 
        label="Detalle de Postres y Bebidas" 
        value={description} 
        onChangeText={setDescription} 
        placeholder="Editar postres y bebidas" 
        error={errorDesc}
        multiline 
      />

      <Text style={styles.label}>Estado del Pedido</Text>
      <View style={styles.row}>
        {(['PENDIENTE', 'EN_PROCESO', 'FINALIZADO'] as StatusType[]).map(s => {
          const isActive = status === s;
          const activeColor = theme.colors.status[s];
          return (
            <TouchableOpacity 
              key={s} 
              style={[styles.selector, isActive && { backgroundColor: activeColor, borderColor: activeColor }]} 
              onPress={() => setStatus(s)}
            >
              <Text style={[styles.selectorText, isActive && styles.selectorTextActive]}>
                {s === 'PENDIENTE' ? '⏳ ' : s === 'EN_PROCESO' ? '☕ ' : '✅ '}
                {s.replace('_', ' ')}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.label}>Prioridad en Barra</Text>
      <View style={styles.row}>
        {(['BAJA', 'MEDIA', 'ALTA'] as PriorityType[]).map(p => {
          const isActive = priority === p;
          const activeColor = theme.colors.priority[p];
          return (
            <TouchableOpacity 
              key={p} 
              style={[styles.selector, isActive && { backgroundColor: activeColor, borderColor: activeColor }]} 
              onPress={() => setPriority(p)}
            >
              <Text style={[styles.selectorText, isActive && styles.selectorTextActive]}>{p}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate} activeOpacity={0.85}>
        <Text style={styles.updateButtonText}>Guardar Cambios</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete} activeOpacity={0.85}>
        <Text style={styles.deleteButtonText}>Eliminar Pedido</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => dispatch({ type: 'NAVIGATE', payload: { screen: 'HOME' } })}>
        <Text style={styles.backButtonText}>Cancelar y Volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, paddingHorizontal: 16, paddingTop: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: theme.colors.textPrimary, marginTop: 15 },
  meta: { fontSize: 13, color: theme.colors.textSecondary, marginBottom: 24, marginTop: 6, fontWeight: '500' },
  label: { fontSize: 14, fontWeight: '700', color: theme.colors.textSecondary, marginBottom: 10, marginTop: 10 },
  row: { flexDirection: 'row', marginBottom: 20 },
  selector: { flex: 1, paddingVertical: 12, borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.borderRadius.md, alignItems: 'center', justifyContent: 'center', marginRight: 6, backgroundColor: theme.colors.surface, elevation: 1 },
  selectorText: { fontSize: 11, fontWeight: 'bold', color: theme.colors.primaryLight },
  selectorTextActive: { color: theme.colors.textWhite },
  updateButton: { backgroundColor: theme.colors.actionBlue, paddingVertical: 15, borderRadius: theme.borderRadius.md, alignItems: 'center', marginTop: 18, elevation: 2 },
  updateButtonText: { color: theme.colors.textWhite, fontWeight: 'bold', fontSize: 16 },
  deleteButton: { backgroundColor: theme.colors.actionRed, paddingVertical: 15, borderRadius: theme.borderRadius.md, alignItems: 'center', marginTop: 12, elevation: 2 },
  deleteButtonText: { color: theme.colors.textWhite, fontWeight: 'bold', fontSize: 16 },
  backButton: { paddingVertical: 15, alignItems: 'center', marginTop: 10 },
  backButtonText: { color: theme.colors.textMuted, fontWeight: '600', fontSize: 14 },
  errorContainer: { flex: 1, backgroundColor: theme.colors.background, justifyContent: 'center', alignItems: 'center' },
  errorTextMsg: { color: theme.colors.actionRed, fontWeight: '600', fontSize: 16 }
});