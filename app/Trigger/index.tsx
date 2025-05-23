// app/Trigger/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../styles/ThemeProvider';

type Params = {
  thread_id: string;
};

export default function TriggerThreadScreen() {
  const { thread_id } = useLocalSearchParams<Params>();
  const router = useRouter();
  const { theme } = useTheme();
  const { colors } = theme;
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    async function runThread() {
      try {
        // Construct your webhook URL, including the thread_id and tenant ID
        const tenant = encodeURIComponent('drewgonzales2021@gmail.com');
        const url = `https://api.weave.cloud/api/webhooks/workflow/66a7db5f604cf798bd09de69?X-Tenant-ID=${tenant}&thread_id=${thread_id}`;
        const resp = await fetch(url, { method: 'GET' });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        setStatus('success');
      } catch (e) {
        console.error('TriggerThread error', e);
        setStatus('error');
      }

      // After a brief pause, navigate back
      setTimeout(() => {
        router.replace('/Dashboard');
      }, 1200);
    }

    runThread();
  }, [thread_id]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <MotiView
        from={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 12, mass: 0.8 }}
        style={styles.inner}
      >
        {status === 'loading' && (
          <>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={[styles.text, { color: colors.text }]}>Triggering thread…</Text>
          </>
        )}

        {status === 'success' && (
          <Text style={[styles.successText, { color: colors.primary }]}>
            🎉 Thread triggered!
          </Text>
        )}

        {status === 'error' && (
          <Text style={[styles.errorText, { color: colors.error }]}>
            ⚠️ Failed to trigger.
          </Text>
        )}
      </MotiView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  inner: { justifyContent: 'center', alignItems: 'center' },
  text: { marginTop: 12, fontSize: 16 },
  successText: { fontSize: 20, fontWeight: '600' },
  errorText: { fontSize: 20, fontWeight: '600' },
});
