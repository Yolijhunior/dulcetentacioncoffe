import React from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { theme } from '../../shared/theme';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  error?: string;
  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
  editable?: boolean; 
}

export const CustomInput = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  error, 
  multiline, 
  keyboardType = 'default' 
}: InputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input, 
          multiline && styles.multiline, 
          error ? { borderColor: '#D32F2F' } : null 
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#A1887F" 
        multiline={multiline}
        keyboardType={keyboardType} 
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    marginBottom: 16 
  },
  label: { 
    fontSize: 14, 
    fontWeight: '700', 
    color: '#5D4037', 
    marginBottom: 6 
  },
  input: {
    backgroundColor: '#FFFFFF', 
    borderWidth: 1,
    borderColor: '#EFEBE9', 
    borderRadius: 12, 
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#3E2723', 
    elevation: 1, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
  },
  multiline: { 
    height: 90, 
    textAlignVertical: 'top',
    paddingTop: 12
  },
  errorText: { 
    color: '#D32F2F', 
    fontSize: 12, 
    marginTop: 4, 
    fontWeight: '600' 
  }
});