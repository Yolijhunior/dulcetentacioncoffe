import React, { useContext } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, LogBox } from 'react-native';
import { AppProvider, AppContext } from './src/infrastructure/AppContext';
import { WelcomeScreen } from './src/presentation/screens/WelcomeScreen';
import { HomeScreen } from './src/presentation/screens/HomeScreen';
import { CreateScreen } from './src/presentation/screens/CreateScreen';
import { DetailScreen } from './src/presentation/screens/DetailScreen';
import { theme } from './src/shared/theme';

LogBox.ignoreAllLogs();

const RootNavigator = () => {
  const { state } = useContext(AppContext);

  switch (state.currentScreen) {
    case 'WELCOME':
      return <WelcomeScreen />;
    case 'HOME':
      return <HomeScreen />;
    case 'CREATE':
      return <CreateScreen />;
    case 'DETAIL':
      return <DetailScreen />;
    default:
      return <WelcomeScreen />;
  }
};

export default function App() {
  return (
    <AppProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={theme.colors.background} barStyle="dark-content" />
        <RootNavigator />
      </SafeAreaView>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});