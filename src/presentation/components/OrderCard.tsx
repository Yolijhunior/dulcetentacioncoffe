import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Order } from '../../domain/order';
import { theme } from '../../shared/theme';
import { StatusChip } from './StatusChip';
import { AppContext } from '../../infrastructure/AppContext';

export const OrderCard = ({ item }: { item: Order }) => {
  const { dispatch } = useContext(AppContext);

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'Salón': return '🍽️';
      case 'Delivery': return '🛵';
      case 'Para Llevar': return '🛍️';
      default: return '📦';
    }
  };

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => dispatch({ type: 'NAVIGATE', payload: { screen: 'DETAIL', id: item.id } })}
      activeOpacity={0.85}
    >
      <View style={styles.header}>
        <Text style={styles.clientName} numberOfLines={1}>
          {getServiceIcon(item.serviceType)}  {item.clientName}
        </Text>
        <StatusChip text={item.status} type={item.status} />
      </View>
      
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>
      
      <View style={styles.divider} />
      
      <View style={styles.footer}>
        <StatusChip text={`Prioridad ${item.priority}`} type={item.priority} />
        <Text style={styles.date}>{item.createdAt}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: theme.borderRadius.lg,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    elevation: 3,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  clientName: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: theme.colors.textPrimary, 
    flex: 1,
    marginRight: 8,
  },
  description: { 
    fontSize: 14, 
    color: theme.colors.textSecondary, 
    marginBottom: 12, 
    lineHeight: 20 
  },
  divider: { 
    height: 1, 
    backgroundColor: theme.colors.background, 
    marginBottom: 12 
  },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  date: { 
    fontSize: 12, 
    color: theme.colors.textMuted, 
    fontWeight: '500'
  }
});