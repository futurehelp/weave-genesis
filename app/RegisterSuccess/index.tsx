import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../styles/ThemeProvider';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');
const CONFETTI_COUNT = 100;

type Confetto = { x: number; delay: number; size: number; color: string; rotate: number };

export default function RegisterSuccess() {
  const { theme } = useTheme();
  const { colors } = theme;
  const router = useRouter();

  const [confetti, setConfetti] = useState<Confetto[]>([]);
  useEffect(() => {
    const pieces: Confetto[] = [];
    const palette = ['#14F195', '#9945FF', '#03E1FF', '#DC1FFF'];
    for (let i = 0; i < CONFETTI_COUNT; i++) {
      pieces.push({
        x: Math.random() * width,
        delay: Math.random() * 1000,
        size: Math.random() * 8 + 4,
        color: palette[Math.floor(Math.random() * palette.length)],
        rotate: Math.random() * 360,
      });
    }
    setConfetti(pieces);
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {confetti.map((c, i) => (
        <MotiView
          key={i}
          from={{ translateY: -10, opacity: 1, rotate: '0deg' }}
          animate={{ translateY: height + 10, opacity: 0, rotate: `${c.rotate}deg` }}
          transition={{ type: 'timing', duration: 3000 + Math.random() * 2000, delay: c.delay }}
          style={{
            position: 'absolute', top: 0, left: c.x, width: c.size, height: c.size,
            backgroundColor: c.color, borderRadius: c.size / 2,
          }}
        />
      ))}

      <View style={[styles.header, { borderBottomColor: colors.border }]}>        
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>          
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Success!</Text>
        <View style={styles.placeholder} />
      </View>

      <MotiView from={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', delay: 200 }} style={styles.content}>
        <Ionicons name="checkmark-circle-outline" size={80} color={colors.primary} />
        <Text style={[styles.message, { color: colors.text }]}>You have successfully registered.</Text>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => router.replace('/Login')}>
          <Text style={[styles.buttonText, { color: '#121212' }]}>Back to Login</Text>
        </TouchableOpacity>
      </MotiView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1 },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  placeholder: { width: 24 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  message: { fontSize: 18, marginVertical: 24, textAlign: 'center' },
  button: { paddingVertical: 14, paddingHorizontal: 32, borderRadius: 12 },
  buttonText: { fontSize: 18, fontWeight: '600' },
});