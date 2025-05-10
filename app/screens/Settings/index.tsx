// app/screens/Settings/index.tsx
import React from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './../../styles/ThemeProvider';

// Define proper types for the SettingItem props
interface SettingItemProps {
  icon: string;
  title: string;
  description?: string;
  toggle?: boolean;
  value?: boolean;
  onToggle?: () => void;
}

export default function Settings() {
  const { theme, setTheme, themeMode } = useTheme();
  const { colors } = theme;
  
  // Toggle for dark mode
  const isDarkMode = themeMode === 'dark';
  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };
  
  // Render a setting item with optional toggle
  const SettingItem: React.FC<SettingItemProps> = ({ 
    icon, 
    title, 
    description, 
    toggle, 
    value, 
    onToggle 
  }) => (
    <MotiView
      from={{ opacity: 0, translateX: -20 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ type: 'timing', duration: 500 }}
      style={[styles.settingItem, { borderBottomColor: colors.border }]}
    >
      <View style={styles.settingIcon}>
        <Ionicons name={icon as any} size={24} color={colors.primary} />
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color: colors.text }]}>{title}</Text>
        {description && (
          <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
            {description}
          </Text>
        )}
      </View>
      {toggle && (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: '#333333', true: `${colors.primary}80` }}
          thumbColor={value ? colors.primary : '#f4f3f4'}
        />
      )}
    </MotiView>
  );
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <MotiView
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500 }}
        >
          <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
        </MotiView>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
            APPEARANCE
          </Text>
          
          <SettingItem
            icon="moon"
            title="Dark Mode"
            description="Use dark theme"
            toggle={true}
            value={isDarkMode}
            onToggle={toggleTheme}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
            ACCOUNT
          </Text>
          
          <SettingItem
            icon="person"
            title="Profile"
            description="Edit your profile information"
          />
          
          <SettingItem
            icon="notifications"
            title="Notifications"
            description="Configure notification settings"
            toggle={true}
            value={true}
            onToggle={() => {}}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
            ABOUT
          </Text>
          
          <SettingItem
            icon="information-circle"
            title="App Version"
            description="1.0.0"
          />
        </View>
      </ScrollView>
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
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginTop: 24,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  settingIcon: {
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
  },
});