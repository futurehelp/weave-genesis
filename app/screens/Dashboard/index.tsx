// app/screens/Dashboard/index.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../styles/ThemeProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FadeIn } from '../../../components/animations';

export default function Dashboard() {
  const { theme } = useTheme();
  const { colors } = theme;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Dashboard</Text>
      </View>
      
      <FadeIn delay={300} style={styles.content}>
        <Text style={[styles.text, { color: colors.text }]}>
          Welcome to Weave!
        </Text>
        
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.primary }]}
        >
          <Text style={[styles.buttonText, { color: colors.background }]}>
            Get Started
          </Text>
        </TouchableOpacity>
      </FadeIn>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});