import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppContext } from '../../infrastructure/AppContext';
import { theme } from '../../shared/theme';

export const WelcomeScreen = () => {
  const { dispatch } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../../assets/logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>Panel de Pedidos</Text>
          <Text style={styles.brandName}>Dulce Tentación</Text>
          <Text style={styles.address}>Calle Morales Bermúdez 390 • Huaral</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => dispatch({ type: 'NAVIGATE', payload: { screen: 'HOME' } })}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Ingresar al Sistema</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: theme.colors.background, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 28,
  },
  content: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20, 
  },
  logoContainer: {
    width: 280, 
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: { 
    width: '100%', 
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: -10,
    marginBottom: 35,
  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: theme.colors.textPrimary,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  brandName: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    marginBottom: 6,
  },
  address: { 
    fontSize: 15, 
    color: theme.colors.textMuted, 
    textAlign: 'center', 
    paddingHorizontal: 10,
    lineHeight: 18,
  },
  button: { 
    backgroundColor: theme.colors.primary,
    paddingVertical: 16, 
    borderRadius: theme.borderRadius.lg, 
    width: '100%', 
    alignItems: 'center',
    elevation: 4,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  buttonText: { 
    color: theme.colors.textWhite, 
    fontSize: 16, 
    fontWeight: 'bold',
    letterSpacing: 0.5,
  }
});