// app/screens/Login/index.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../styles/ThemeProvider';
import { useRouter } from 'expo-router';

export default function Login() {
  const { theme } = useTheme();
  const { colors } = theme;
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <MotiView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', delay: 200 }}
        style={styles.headerContainer}
      >
        <Text style={[styles.title, { color: colors.text }]}>Welcome to Weave</Text>
      </MotiView>

      <View style={styles.contentContainer}>
        {/* Google Sign-In */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', delay: 300 }}
          style={styles.socialContainer}
        >
          <TouchableOpacity style={[styles.socialButton, { borderColor: colors.border }]}>  
            <Ionicons name="logo-google" size={24} color={colors.text} />
            <Text style={[styles.socialText, { color: colors.text }]}>Sign in with Google</Text>
          </TouchableOpacity>
        </MotiView>

        <View style={[styles.dividerContainer, { borderBottomColor: colors.border }]} />

        {/* Form Fields */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', delay: 400 }}
          style={styles.form}
        >
          <TextInput
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            placeholder="Email"
            placeholderTextColor={colors.textSecondary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            placeholder="Password"
            placeholderTextColor={colors.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={() => router.replace('/Dashboard')}
          >
            <Text style={[styles.buttonText, { color: '#121212' }]}>Log In</Text>
          </TouchableOpacity>
        </MotiView>

        <TouchableOpacity onPress={() => router.push('/Register')}>
          <Text style={[styles.linkText, { color: colors.primary }]}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  headerContainer: { alignItems: 'center', marginTop: 40, marginBottom: 20 },
  title: { fontSize: 32, fontWeight: 'bold' },
  contentContainer: { flex: 1, alignItems: 'center', justifyContent: 'flex-start' },
  socialContainer: { width: width * 0.8, alignItems: 'center', marginBottom: 16 },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
    width: '100%',
  },
  socialText: { marginLeft: 8, fontSize: 16, fontWeight: '600' },
  dividerContainer: {
    width: width * 0.8,
    borderBottomWidth: 1,
    marginVertical: 16,
  },
  form: { width: width * 0.8 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    fontSize: 16,
    width: '100%',
  },
  button: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
  },
  buttonText: { fontSize: 18, fontWeight: 'bold' },
  linkText: { textAlign: 'center', marginTop: 12, fontSize: 14 },
});({
  container: { flex: 1, padding: 16 },
  headerContainer: { alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 32, fontWeight: 'bold' },
  contentContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  form: { width: '100%' },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    fontSize: 16,
    width: '100%',
  },
  button: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
  },
  buttonText: { fontSize: 18, fontWeight: 'bold' },
  linkText: { textAlign: 'center', marginTop: 12, fontSize: 14 },
  socialContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 24,
  },
  divider: {
    width: '80%',
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    width: '80%',
    justifyContent: 'center',
  },
  socialText: { marginLeft: 8, fontSize: 16, fontWeight: '600' },
});