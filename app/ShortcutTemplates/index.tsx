// app/screens/ShortcutTemplates/index.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { useTheme } from '../../styles/ThemeProvider';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const MOCK_THREADS = [
  { id: '1', title: 'SOS Thread', description: 'Turn lights red, alert Dylan, message on Gmail & Discord.', color: '#DC1FFF' },
  { id: '2', title: 'All Hands on Meeting', description: 'Notifies everyone on Discord for urgent meeting.', color: '#14F195' },
];

export default function ShortcutTemplates() {
  const { theme } = useTheme();
  const { colors } = theme;
  const router = useRouter();
  const [showHelp, setShowHelp] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Shortcuts</Text>
        <TouchableOpacity onPress={() => setShowHelp(true)}>
          <Ionicons name="help-circle-outline" size={22} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Explainer Modal */}
      <Modal visible={showHelp} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.primary }]}>How to use Shortcuts</Text>
            <Text style={[styles.modalText, { color: colors.text }]}>
              1. Go to the iOS Shortcuts app and create a new automation.
              {"\n\n"}2. Add a trigger (like “Message contains SOS”).
              {"\n\n"}3. Search for Weave and select “Trigger Thread”.
              {"\n\n"}4. Pick the workflow you want to trigger!
            </Text>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: colors.primary }]}
              onPress={() => setShowHelp(false)}
            >
              <Text style={{ color: '#121212', fontWeight: 'bold' }}>Got it!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <FlatList
        data={MOCK_THREADS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 0.7, translateY: 0 }}
            transition={{ type: 'timing', duration: 800 }}
            style={styles.emptyState}
          >
            <Ionicons name="git-branch-outline" size={60} color={colors.secondary} />
            <Text style={[styles.emptyText, { color: colors.text }]}>
              No threads found! Create one in Weave to get started.
            </Text>
          </MotiView>
        )}
        renderItem={({ item, index }) => (
          <MotiView
            from={{ opacity: 0, scale: 0.95, translateY: 18 }}
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
            transition={{ type: 'timing', delay: 120 * index }}
            style={[styles.threadCard, { borderLeftColor: item.color, backgroundColor: colors.card }]}
          >
            <Text style={[styles.threadTitle, { color: colors.text }]}>{item.title}</Text>
            <Text style={[styles.threadDesc, { color: colors.textSecondary }]}>{item.description}</Text>
            <TouchableOpacity
              style={[styles.shortcutButton, { backgroundColor: item.color }]}
              onPress={() => {/* Show dialog: "Setup this in iOS Shortcuts app by searching Weave > Trigger Thread" */}}
            >
              <Ionicons name="flash-outline" size={18} color="#fff" />
              <Text style={styles.shortcutButtonText}>Setup in Shortcuts</Text>
            </TouchableOpacity>
          </MotiView>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 16, borderBottomWidth: 1,
  },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  listContent: { padding: 16 },
  threadCard: {
    borderRadius: 12, padding: 18, marginBottom: 18, borderLeftWidth: 5,
    shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.07, shadowRadius: 10, elevation: 3,
  },
  threadTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  threadDesc: { fontSize: 14, marginBottom: 18, opacity: 0.7 },
  shortcutButton: {
    flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start',
    paddingVertical: 8, paddingHorizontal: 18, borderRadius: 9, marginTop: 6,
  },
  shortcutButtonText: { color: '#fff', marginLeft: 7, fontWeight: '600' },
  emptyState: { alignItems: 'center', marginTop: 48 },
  emptyText: { fontSize: 17, opacity: 0.8, marginTop: 16, textAlign: 'center' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: '#0008', justifyContent: 'center', alignItems: 'center' },
  modalContent: { borderRadius: 18, padding: 26, width: width * 0.8, alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 14 },
  modalText: { fontSize: 15, marginBottom: 22, textAlign: 'center' },
  modalButton: { paddingVertical: 10, paddingHorizontal: 32, borderRadius: 12 },
});
