import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusChip } from './StatusChip';
import { theme } from '../../shared/theme';
import { Order } from '../../domain/order';

interface OrderCardProps {
  order: Order;
  onPress: () => void;
}

export const OrderCard = ({ order, onPress }: OrderCardProps) => {
  if (!order || !order.serviceType || !order.priority) {
    return null;
  }

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'Salón': return '🍽️';
      case 'Delivery': return '🛵';
      default: return '🛍️';
    }
  };

  const serviceColor = theme.colors.services?.[order.serviceType] || theme.colors.primary;
  const priorityColor = theme.colors.priority?.[order.priority] || theme.colors.textSecondary;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.header}>
        <Text style={styles.clientName} numberOfLines={1}>
          {order.clientName}
        </Text>
        <StatusChip text={order.status} type={order.status as any} />
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {order.description}
      </Text>

      <View style={styles.footer}>
        <View style={[styles.badge, { backgroundColor: serviceColor }]}>

          <Text style={styles.badgeText} numberOfLines={1}>
            {getServiceIcon(order.serviceType)} {order.serviceType}
          </Text>
        </View>

        <Text style={[styles.priorityText, { color: priorityColor }]}>
          ⚠️ {order.priority}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: theme.colors.surface, padding: 15, borderRadius: theme.borderRadius.md, marginBottom: 12, borderWidth: 1, borderColor: theme.colors.border, elevation: 2 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  clientName: { fontSize: 16, fontWeight: 'bold', color: theme.colors.textPrimary, flex: 1, marginRight: 10 },
  description: { fontSize: 14, color: theme.colors.textSecondary, marginBottom: 12, lineHeight: 18 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTopWidth: 1, borderColor: '#F5F5F5' },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }, 
  badgeText: { color: theme.colors.textWhite, fontSize: 11, fontWeight: 'bold' },
  priorityText: { fontSize: 13, fontWeight: 'bold' }
});