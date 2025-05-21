// app/screens/Splash/index.tsx
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { MotiView, useAnimationState } from 'moti';
import { useRouter, Redirect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const LOGO_SIZE = 100;

export default function Splash() {
  const router = useRouter();
  const animation = useAnimationState({
    from: { scale: 0.5, rotate: '0deg', opacity: 0 },
    to: { scale: 1, rotate: '360deg', opacity: 1 },
    out: { scale: 0.8, rotate: '720deg', opacity: 0 },
  });

  useEffect(() => {
    async function animateAndRedirect() {
      animation.transitionTo('to');
      await new Promise(r => setTimeout(r, 1200));
      animation.transitionTo('out');
      await new Promise(r => setTimeout(r, 600));
      // Navigate to Login
      router.replace('/Login');
    }
    animateAndRedirect();
  }, [animation, router]);

  // Floating particles
  const particles = Array.from({ length: 20 }).map((_, i) => {
    const size = Math.random() * 6 + 4;
    const x = Math.random() * width;
    const delay = Math.random() * 1000;
    const duration = 2000 + Math.random() * 2000;
    const color = `hsl(${Math.random() * 360}, 70%, 60%)`;
    return (
      <MotiView
        key={i}
        from={{ translateY: height + size, opacity: 0 }}
        animate={{ translateY: -size, opacity: 1 }}
        transition={{ type: 'timing', delay, duration, loop: true }}
        style={[styles.particle, { width: size, height: size, backgroundColor: color, left: x }]}
      />
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      {particles}
      <MotiView
        state={animation}
        style={styles.logoContainer}
        transition={{ type: 'spring', stiffness: 150, damping: 10 }}
      >
        <Ionicons name="cloud-outline" size={LOGO_SIZE} color="#14F195" />
      </MotiView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  logoContainer: {
    position: 'absolute',
    top: '40%',
  },
  particle: {
    position: 'absolute',
    borderRadius: 50,
  },
});
