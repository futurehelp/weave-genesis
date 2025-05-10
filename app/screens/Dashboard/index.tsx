// app/screens/Dashboard/index.tsx
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { MotiView, useAnimationState } from 'moti';
import React, { useEffect } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../styles/ThemeProvider';

const { width } = Dimensions.get('window');

// Animated letter component for the "WEAVE" text
const AnimatedLetter = ({ letter, index, total }: { letter: string; index: number; total: number }) => {
  // Create an animation state for each letter
  const animationState = useAnimationState({
    from: {
      translateY: 0,
      opacity: 0.7,
    },
    to: {
      translateY: -10,
      opacity: 1,
    },
    hover: {
      translateY: 0,
      opacity: 0.7,
    }
  });

  // Start animation when component mounts
  useEffect(() => {
    // Delay based on letter position for wave effect
    const timer = setTimeout(() => {
      animationState.transitionTo('to');
    }, index * 80);

    // Cycle animation
    const interval = setInterval(() => {
      animationState.transitionTo('hover');
      
      setTimeout(() => {
        animationState.transitionTo('to');
      }, 600);
      
    }, 2000 + (index * 200)); // Different timing for each letter

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [animationState, index]);

  // Calculate gradient color based on position
  const colorStart = '#14F195'; // Solana green
  const colorEnd = '#9945FF';   // Solana purple
  const progress = index / (total - 1);
  
  // Interpolate between the two colors
  const r1 = parseInt(colorStart.slice(1, 3), 16);
  const g1 = parseInt(colorStart.slice(3, 5), 16);
  const b1 = parseInt(colorStart.slice(5, 7), 16);
  
  const r2 = parseInt(colorEnd.slice(1, 3), 16);
  const g2 = parseInt(colorEnd.slice(3, 5), 16);
  const b2 = parseInt(colorEnd.slice(5, 7), 16);
  
  const r = Math.round(r1 + (r2 - r1) * progress);
  const g = Math.round(g1 + (g2 - g1) * progress);
  const b = Math.round(b1 + (b2 - b1) * progress);
  
  const color = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

  return (
    <MotiView
      state={animationState}
      transition={{
        type: 'spring',
        damping: 10,
        mass: 0.8,
      }}
    >
      <Text style={[styles.titleLetter, { color }]}>
        {letter}
      </Text>
    </MotiView>
  );
};

// Animated card component
const AnimatedCard = ({ title, value, icon, color, delay }: any) => {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', delay, duration: 500 }}
      style={[styles.card, { borderLeftColor: color }]}
    >
      <View style={styles.cardIcon}>
        <Ionicons name={icon as any} size={24} color={color} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardValue}>{value}</Text>
      </View>
    </MotiView>
  );
};

// Floating bubbles animation
const FloatingBubbles = () => {
  return (
    <View style={styles.bubblesContainer}>
      {[...Array(15)].map((_, index) => {
        // Random properties for each bubble
        const size = Math.random() * 12 + 4;
        const initialX = Math.random() * width;
        const duration = Math.random() * 10000 + 8000;
        const delay = Math.random() * 5000;
        
        // Random color from Solana palette
        const colors = ['#14F19580', '#9945FF80', '#03E1FF80', '#DC1FFF80'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return (
          <MotiView
            key={index}
            style={[
              styles.bubble,
              { 
                width: size, 
                height: size, 
                borderRadius: size / 2,
                backgroundColor: color,
                left: initialX,
              }
            ]}
            from={{ 
              translateY: 800,
              opacity: 0.4,
            }}
            animate={{ 
              translateY: -100,
              opacity: 0.8,
            }}
            transition={{
              type: 'timing',
              duration,
              delay,
              loop: true,
            }}
          />
        );
      })}
    </View>
  );
};

export default function Dashboard() {
  const { theme } = useTheme();
  const { colors } = theme;
  const router = useRouter();

  const handleGetStarted = () => {
    // Trigger haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Navigate to Thread Builder
    router.push('/screens/ThreadBuilder' as any);
  };

  // Title text with letters for animation
  const title = 'WEAVE';
  const titleLetters = title.split('');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <MotiView
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500 }}
        >
          {/* <Text style={[styles.headerTitle, { color: colors.text }]}>Dashboard</Text> */}
        </MotiView>
        
        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 500, delay: 200 }}
        >
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
            <View style={[styles.notificationBadge, { backgroundColor: colors.error }]}>
              <Text style={styles.notificationCount}>3</Text>
            </View>
          </TouchableOpacity>
        </MotiView>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Animated Background Bubbles */}
        <FloatingBubbles />

        {/* Animated Title */}
        <View style={styles.titleContainer}>
          <View style={styles.titleRow}>
            {titleLetters.map((letter, index) => (
              <AnimatedLetter 
                key={index} 
                letter={letter} 
                index={index}
                total={titleLetters.length}
              />
            ))}
          </View>
          
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 0.7, translateY: 0 }}
            transition={{ type: 'timing', delay: 500, duration: 800 }}
          >
            <Text style={[styles.subtitle, { color: colors.text }]}>
              No-code platform with AI & blockchain
            </Text>
          </MotiView>
        </View>
        
        {/* Stats Section */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 500, delay: 300 }}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Overview</Text>
        </MotiView>
        
        <View style={styles.cardsContainer}>
          <AnimatedCard
            title="Total Projects"
            value="12"
            icon="folder"
            color={colors.primary}
            delay={400}
          />
          <AnimatedCard
            title="Active Threads"
            value="8"
            icon="git-branch"
            color={colors.secondary}
            delay={500}
          />
          <AnimatedCard
            title="AI Credits"
            value="4,500"
            icon="flash"
            color={colors.accent1}
            delay={600}
          />
          <AnimatedCard
            title="Storage Used"
            value="68%"
            icon="cloud"
            color={colors.accent2}
            delay={700}
          />
        </View>
        
        {/* Get Started Button */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800, delay: 800 }}
          style={styles.buttonContainer}
        >
          <MotiView
            from={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              type: 'timing',
              duration: 2000,
              loop: true,
            }}
          >
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={handleGetStarted}
              activeOpacity={0.8}
            >
              <Text style={[styles.buttonText, { color: '#121212' }]}>
                Get Started
              </Text>
            </TouchableOpacity>
          </MotiView>
        </MotiView>
      </ScrollView>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationCount: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  bubblesContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  bubble: {
    position: 'absolute',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  titleRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  titleLetter: {
    fontSize: 48,
    fontWeight: 'bold',
    marginHorizontal: 2,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
  },
  cardIcon: {
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    color: '#AAAAAA',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});