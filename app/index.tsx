// app/index.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useTheme } from './styles/ThemeProvider';

// Keep the splash screen visible until we're ready
SplashScreen.preventAutoHideAsync();

export default function Index() {
  const { theme } = useTheme();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, data, etc.
        // Artificially delay for demonstration
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      onLayout={onLayoutRootView}
    >
      {/* Redirect to the Dashboard */}
      <Redirect href="/screens/Dashboard" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});