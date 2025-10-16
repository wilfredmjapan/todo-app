import React from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './src/screens/Home/Home';
import { AppProvider } from './src/context/AppContext';

function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView />
      <AppProvider>
        <Home />
      </AppProvider>
    </SafeAreaProvider>
  );
}

export default App;
