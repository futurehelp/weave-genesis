// app/ShortcutTemplates/index.tsx
import React from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { useTheme } from '../../styles/ThemeProvider';

const TEMPLATES = [
  { id: 'outOfOffice', name: 'Out of Office on Google Calendar', icon: 'calendar-outline' },
  { id: 'twitterBot',   name: 'Twitter Bot',                    icon: 'logo-twitter'       },
  // add more templates here
];

export default function ShortcutTemplates() {
  const { theme } = useTheme();
  const { colors } = theme;
  const router = useRouter();

  const renderItem = ({ item }: { item: typeof TEMPLATES[0] }) => (
    <TouchableOpacity
      style={[styles.item, { borderColor: colors.border }]}
      onPress={() => {
        console.log('Selected template:', item.id);
        // TODO: navigate to workflow detail or execution
      }}
    >
      <MotiView
        from={{ opacity: 0, translateX: -20 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ type: 'timing', duration: 400 }}
        style={styles.iconWrapper}
      >
        <Ionicons name={item.icon as any} size={28} color={colors.primary} />
      </MotiView>
      <Text style={[styles.itemText, { color: colors.text }]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>      
      <View style={[styles.header, { borderBottomColor: colors.border }]}>        
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <MotiView
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500 }}
        >
          <Text style={[styles.headerTitle, { color: colors.text }]}>Shortcut Templates</Text>
        </MotiView>
        <View style={styles.placeholderView} />
      </View>

      <FlatList
        data={TEMPLATES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        style={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholderView: {
    width: 24,
  },
  listContainer: {
    flex: 1,
  },
  list: {
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  iconWrapper: {
    marginRight: 12,
  },
  itemText: {
    fontSize: 16,
    flexShrink: 1,
  },
});
