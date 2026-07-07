import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AppContext } from '../../infrastructure/AppContext';
import { OrderCard } from '../components/OrderCard';
import { theme } from '../../shared/theme';
import { StatusType } from '../../domain/order';

export const HomeScreen = () => {
  const { state, dispatch } = useContext(AppContext);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusType | 'TODOS'>('TODOS');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, [statusFilter, search]);

  const filteredOrders = state.orders.filter(order => {
    const matchesSearch = 
      (order.clientName?.toLowerCase() || '').includes(search.toLowerCase()) || 
      (order.description?.toLowerCase() || '').includes(search.toLowerCase());
    const matchesFilter = statusFilter === 'TODOS' || order.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const filterOptions: { label: string; value: 'TODOS' | StatusType }[] = [
    { label: '🍩 Todos', value: 'TODOS' },
    { label: '⏳ Pendientes', value: 'PENDIENTE' },
    { label: '☕ Preparando', value: 'EN_PROCESO' },
    { label: '✅ Listos', value: 'FINALIZADO' }
  ];

  const getTabActiveColor = (value: 'TODOS' | StatusType) => {
    if (value === 'TODOS') return theme.colors.primary;
    return theme.colors.status[value];
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.brandTitle}>Dulce Tentación</Text>
          <Text style={styles.subtitle}>Gestión de Pedidos</Text>
        </View>
        <TouchableOpacity 
          style={styles.createButton} 
          onPress={() => dispatch({ type: 'NAVIGATE', payload: { screen: 'CREATE' } })}
          activeOpacity={0.85}
        >
          <Text style={styles.createButtonText}>+ Nueva Orden</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="🔍 Buscar por mesa, cliente o postre..."
          placeholderTextColor={theme.colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.gridContainer}>
        {filterOptions.map((opt) => {
          const isActive = statusFilter === opt.value;
          const activeColor = getTabActiveColor(opt.value);
          
          return (
            <TouchableOpacity
              key={opt.value}
              style={[
                styles.filterGridTab, 
                isActive && { backgroundColor: activeColor, borderColor: activeColor }
              ]}
              onPress={() => setStatusFilter(opt.value)}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.filterGridText, 
                isActive && styles.filterTextActive
              ]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loaderText}>Actualizando órdenes...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredOrders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <OrderCard item={item} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Ningún pedido coincide con la búsqueda. 🥧</Text>
            </View>
          }
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, paddingHorizontal: 16, paddingTop: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, marginBottom: 20 },
  brandTitle: { fontSize: 24, fontWeight: 'bold', color: theme.colors.textPrimary },
  subtitle: { fontSize: 14, color: theme.colors.textSecondary, fontWeight: '500' },
  createButton: { backgroundColor: theme.colors.primary, paddingHorizontal: 14, paddingVertical: 10, borderRadius: theme.borderRadius.md, elevation: 2, shadowColor: theme.colors.primary, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3 },
  createButtonText: { color: theme.colors.textWhite, fontWeight: 'bold', fontSize: 13 },
  searchContainer: { marginBottom: 14 },
  searchBar: { backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.borderRadius.md, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, color: theme.colors.textPrimary, elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 16 },
  filterGridTab: { width: '48.5%', backgroundColor: theme.colors.border, paddingVertical: 12, borderRadius: theme.borderRadius.md, borderWidth: 1, borderColor: theme.colors.border, alignItems: 'center', justifyContent: 'center', marginBottom: 8, elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 1 },
  filterGridText: { fontSize: 13, fontWeight: 'bold', color: theme.colors.textSecondary },
  filterTextActive: { color: theme.colors.textWhite },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 },
  loaderText: { marginTop: 12, color: theme.colors.textSecondary, fontSize: 14, fontWeight: '500' },
  emptyContainer: { alignItems: 'center', marginTop: 50, paddingHorizontal: 20 },
  emptyText: { textAlign: 'center', color: theme.colors.textMuted, fontSize: 15, lineHeight: 22 }
});