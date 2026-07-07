import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../shared/theme';
import { StatusType, PriorityType } from '../../domain/order';

interface ChipProps {
  text: string;
  type: StatusType | PriorityType;
}

export const StatusChip = ({ text, type }: ChipProps) => {
  const colorValue = 
    type in theme.colors.status 
      ? theme.colors.status[type as StatusType] 
      : theme.colors.priority[type as PriorityType] || theme.colors.textSecondary;
  const backgroundColor = `${colorValue}15`; 

  return (
    <View style={[styles.chip, { backgroundColor, borderColor: colorValue }]}>
      <Text style={[styles.text, { color: colorValue }]}>
        {text.replace('_', ' ')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  text: { 
    fontSize: 11, 
    fontWeight: '700', 
    letterSpacing: 0.5 
  }
});