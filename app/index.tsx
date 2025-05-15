// app/index.tsx
import { Redirect } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import { LogBox, StyleSheet, View } from 'react-native';
import { useTheme } from '../styles/ThemeProvider';

// ✅ Show all logs
LogBox.ignoreAllLogs(false);

// ✅ Prevent native splash from hiding automatically
SplashScreen.preventAutoHideAsync();

export default function Index() {
  const { theme } = useTheme();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      console.log('✅ JS is running: app/index.tsx');

      try {
        // ✅ Simulate load
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn('❌ Error in prepare():', e);
      } finally {
        setAppIsReady(true);
        console.log('✅ App is ready');
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      console.log('✅ Hiding splash screen');
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) return null;

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      onLayout={onLayoutRootView}
    >
      <Redirect href="/Dashboard" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
