import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useOrderForm } from '../hooks/useOrderForm';
import { CustomInput } from '../components/CustomInput';
import { theme } from '../../shared/theme';
import { ServiceType, PriorityType } from '../../domain/order';

export const CreateScreen = () => {
  const {
    form,
    setForm,
    serviceType,
    setServiceType,
    priority,
    setPriority,
    errors,
    handleSave,
    handleCancel
  } = useOrderForm();

  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent} 
    >
      <Text style={styles.title}>Nueva Orden</Text>
      
      <CustomInput 
        label="Mesa / Cliente" 
        value={form.clientName} 
        onChangeText={(t) => setForm({...form, clientName: t})} 
        placeholder="Ej. Mesa 3 o María Ramos" 
        error={errors.clientName} 
      />
      
      <CustomInput 
        label="Teléfono de Contacto" 
        value={form.phone} 
        onChangeText={(t) => setForm({...form, phone: t})} 
        placeholder="Ej. 987654321" 
        error={errors.phone} 
        keyboardType="phone-pad"
      />
      
      <CustomInput 
        label="Detalle del Pedido" 
        value={form.description} 
        onChangeText={(t) => setForm({...form, description: t})} 
        placeholder="Ej. 1 Torta de chocolate, 1 Capuccino con chispas..." 
        error={errors.description} 
        multiline 
      />

      <Text style={styles.sectionLabel}>Tipo de Servicio</Text>
      <View style={styles.row}>
        {(['Salón', 'Delivery', 'Para Llevar'] as ServiceType[]).map(t => {
          const isActive = serviceType === t;
          const activeColor = theme.colors.services[t]; 
          
          return (
            <TouchableOpacity 
              key={t} 
              style={[
                styles.selector, 
                isActive && { backgroundColor: activeColor, borderColor: activeColor }
              ]} 
              onPress={() => setServiceType(t)}
              activeOpacity={0.8}
            >
              <Text 
                style={[styles.selectorText, isActive && { color: theme.colors.textWhite }]}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {t === 'Salón' ? '🍽️ ' : t === 'Delivery' ? '🛵 ' : '🛍️ '}
                {t}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.sectionLabel}>Prioridad de Preparación</Text>
      <View style={styles.row}>
        {(['BAJA', 'MEDIA', 'ALTA'] as PriorityType[]).map(p => {
          const isActive = priority === p;
          const activeColor = theme.colors.priority[p];
          return (
            <TouchableOpacity 
              key={p} 
              style={[
                styles.selector, 
                isActive && { backgroundColor: activeColor, borderColor: activeColor }
              ]} 
              onPress={() => setPriority(p)}
              activeOpacity={0.8}
            >
              <Text style={[styles.selectorText, isActive && { color: theme.colors.textWhite }]}>{p}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.85}>
        <Text style={styles.saveButtonText}>Enviar a Cocina</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text style={styles.cancelButtonText}>Volver al Inicio</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, paddingHorizontal: 16, paddingTop: 20 },
  scrollContent: { paddingBottom: 60 },
  title: { fontSize: 26, fontWeight: 'bold', color: theme.colors.textPrimary, marginTop: 15, marginBottom: 24 },
  sectionLabel: { fontSize: 14, fontWeight: '700', color: theme.colors.textSecondary, marginBottom: 10, marginTop: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, width: '100%' },
  selector: { 
    flex: 1, 
    paddingVertical: 12, 
    paddingHorizontal: 4, 
    borderWidth: 1, 
    borderColor: theme.colors.border, 
    borderRadius: theme.borderRadius.md, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: theme.colors.surface, 
    marginHorizontal: 3, 
    elevation: 1 
  },
  selectorText: { 
    fontSize: 11, 
    fontWeight: 'bold', 
    color: theme.colors.primaryLight, 
    textAlign: 'center' 
  },
  saveButton: { backgroundColor: theme.colors.actionBlue, paddingVertical: 15, borderRadius: theme.borderRadius.md, alignItems: 'center', marginTop: 28, elevation: 3 },
  saveButtonText: { color: theme.colors.textWhite, fontWeight: 'bold', fontSize: 16 },
  cancelButton: { paddingVertical: 15, alignItems: 'center', marginTop: 10 },
  cancelButtonText: { color: theme.colors.textMuted, fontWeight: '600', fontSize: 14 }
});