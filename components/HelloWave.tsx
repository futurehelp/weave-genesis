// components/HelloWave.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const HelloWave = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>👋 Hello!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#14F195',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#121212',
  }
});

export default HelloWave;