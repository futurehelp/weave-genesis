// app/_layout.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from './styles/ThemeProvider';
import AnimatedTabBar from '../components/navigation/AnimatedTabBar';

// Import necessary for Moti animations
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  tabBarContainer: {
    backgroundColor: '#1E1E1E',
  },
});