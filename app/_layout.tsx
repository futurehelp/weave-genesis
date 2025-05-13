// app/_layout.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AnimatedTabBar from '../components/navigation/AnimatedTabBar';
import { ThemeProvider } from '../styles/ThemeProvider';
import useApartmentGeofence from '../hooks/useApartmentGeofence';

// Import Moti’s animation dependency
import 'react-native-reanimated';

export default function RootLayout() {
  // ✅ Enable GPS alert logic when app mounts
  useApartmentGeofence();

  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaProvider>
        <ThemeProvider initialTheme="dark">
          <StatusBar style="light" />
          <View style={styles.container}>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#121212' },
                animation: 'fade_from_bottom',
              }}
            />
            <SafeAreaView edges={['bottom']} style={styles.tabBarContainer}>
              <AnimatedTabBar />
            </SafeAreaView>
          </View>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  tabBarContainer: {
    backgroundColor: '#1E1E1E',
  },
});
