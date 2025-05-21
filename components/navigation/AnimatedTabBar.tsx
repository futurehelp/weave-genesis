// components/navigation/AnimatedTabBar.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { usePathname, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

// const { width } = Dimensions.get('window');

type TabIconName = 
  | 'home-outline' 
  | 'home' 
  | 'git-branch-outline' 
  | 'git-branch' 
  | 'layers-outline' 
  | 'layers' 
  | 'flash-outline'    // for Shortcuts
  | 'flash'            // filled state
  | 'settings-outline' 
  | 'settings';

interface TabItem {
  name: string;
  icon: TabIconName;
  path: string;
}

const tabs: TabItem[] = [
  {
    name: 'Home',
    icon: 'home-outline',
    path: '/',
  },
  {
    name: 'Thread Builder',
    icon: 'git-branch-outline',
    path: '/ThreadBuilder',
  },
  {
    name: 'Feed',
    icon: 'layers-outline',
    path: '/WeaveFeed',
  },
  {
    name: 'Shortcuts',
    icon: 'flash-outline',
    path: '/ShortcutTemplates',
  },
  {
    name: 'Settings',
    icon: 'settings-outline',
    path: '/Settings',
  },
];

const AnimatedTabBar = () => {
  const router = useRouter();
  const currentPath = usePathname();

  const handlePress = (path: string) => {
    // Play haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    // Navigate to the route - use the type assertion to fix the error
    router.push(path as any);
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const isActive = currentPath === tab.path || 
                        (currentPath === '/screens/Dashboard' && tab.path === '/');
        
        // Convert outline icon to filled icon when active
        const iconName = isActive 
          ? (tab.icon.replace('-outline', '') as TabIconName) 
          : tab.icon;
        
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => handlePress(tab.path)}
            activeOpacity={0.7}
          >
            <MotiView
              style={styles.iconContainer}
              animate={{
                scale: isActive ? 1.1 : 1,
              }}
              transition={{
                type: 'timing',
                duration: 300,
              }}
            >
              <Ionicons
                name={iconName as any}
                size={24}
                color={isActive ? '#14F195' : '#AAAAAA'}
              />
              
              {/* Removed the dot indicator */}
            </MotiView>
            
            <MotiView
              animate={{
                translateY: isActive ? -4 : 0,
              }}
              transition={{
                type: 'timing',
                duration: 300,
              }}
            >
              <Text 
                style={[
                  styles.label, 
                  { color: isActive ? '#14F195' : '#AAAAAA' }
                ]}
              >
                {tab.name}
              </Text>
            </MotiView>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#1E1E1E',
    borderTopWidth: 1,
    borderTopColor: '#333333',
    paddingBottom: 10,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
  },
});

export default AnimatedTabBar;