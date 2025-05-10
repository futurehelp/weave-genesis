// app/screens/WeaveFeed/index.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView, MotiText, AnimatePresence } from 'moti';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../styles/ThemeProvider';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// Mock data for feed
const FEED_ITEMS = [
  {
    id: '1',
    author: 'Alex Johnson',
    avatar: 'https://via.placeholder.com/60',
    timestamp: '2 hours ago',
    content: 'Just launched my new project built with Weave! Check out this no-code blockchain app I made in just a few hours.',
    likes: 42,
    comments: 7,
    shares: 3,
    tags: ['NoCode', 'Blockchain', 'Launch'],
    isLiked: false
  },
  {
    id: '2',
    author: 'Sarah Miller',
    avatar: 'https://via.placeholder.com/60',
    timestamp: '5 hours ago',
    content: "Weave AI capabilities are mind-blowing. I asked it to generate a landing page and the results were incredible.",
    likes: 28,
    comments: 12,
    shares: 5,
    tags: ['AI', 'Design', 'Productivity'],
    isLiked: true
  },
  {
    id: '3',
    author: 'David Chen',
    avatar: 'https://via.placeholder.com/60',
    timestamp: 'Yesterday',
    content: 'Anyone interested in collaborating on a DeFi project using Weave? Looking for designers and blockchain enthusiasts!',
    likes: 15,
    comments: 23,
    shares: 2,
    tags: ['DeFi', 'Collaboration', 'Design'],
    isLiked: false
  },
  {
    id: '4',
    author: 'Maria Garcia',
    avatar: 'https://via.placeholder.com/60',
    timestamp: '2 days ago',
    content: 'Just published my thread about "Getting Started with Blockchain Development" - all built and designed in Weave!',
    likes: 67,
    comments: 14,
    shares: 9,
    tags: ['Tutorial', 'Blockchain', 'ThreadBuilder'],
    isLiked: false
  },
];

export default function WeaveFeed() {
  const { theme } = useTheme();
  const { colors } = theme;
  const router = useRouter();
  
  // State for feed items to track likes
  const [feedItems, setFeedItems] = useState(FEED_ITEMS);
  
  // Handle like action
  const handleLike = (id: string) => {
    setFeedItems(items => 
      items.map(item => 
        item.id === id 
          ? { 
              ...item, 
              isLiked: !item.isLiked, 
              likes: item.isLiked ? item.likes - 1 : item.likes + 1 
            } 
          : item
      )
    );
  };
  
  // Render feed item
  const renderFeedItem = (item: any, index: number) => {
    return (
      <MotiView
        key={item.id}
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ 
          type: 'timing', 
          duration: 600,
          delay: index * 100 
        }}
        style={[styles.feedItem, { backgroundColor: colors.card }]}
      >
        <View style={styles.feedHeader}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: item.avatar }}
              style={styles.avatar}
            />
          </View>
          <View style={styles.authorInfo}>
            <Text style={[styles.authorName, { color: colors.text }]}>{item.author}</Text>
            <Text style={[styles.timestamp, { color: colors.textSecondary }]}>{item.timestamp}</Text>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-horizontal" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={[styles.contentText, { color: colors.text }]}>{item.content}</Text>
        </View>
        
        <View style={styles.tagsContainer}>
          {item.tags.map((tag: string) => (
            <MotiView
              key={tag}
              style={[styles.tag, { backgroundColor: `${colors.secondary}20` }]}
              from={{ scale: 0.9, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <Text style={[styles.tagText, { color: colors.secondary }]}>#{tag}</Text>
            </MotiView>
          ))}
        </View>
        
        <View style={[styles.actionsContainer, { borderTopColor: colors.border }]}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleLike(item.id)}
          >
            <MotiView
              animate={{ 
                scale: item.isLiked ? [1, 1.3, 1] : 1 
              }}
              transition={{
                type: 'timing',
                duration: 300,
              }}
            >
              <Ionicons
                name={item.isLiked ? "heart" : "heart-outline"}
                size={22}
                color={item.isLiked ? colors.error : colors.textSecondary}
              />
            </MotiView>
            <Text 
              style={[
                styles.actionText, 
                { 
                  color: item.isLiked ? colors.error : colors.textSecondary 
                }
              ]}
            >
              {item.likes}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={20} color={colors.textSecondary} />
            <Text style={[styles.actionText, { color: colors.textSecondary }]}>{item.comments}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-social-outline" size={20} color={colors.textSecondary} />
            <Text style={[styles.actionText, { color: colors.textSecondary }]}>{item.shares}</Text>
          </TouchableOpacity>
        </View>
      </MotiView>
    );
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
          <Text style={[styles.backText, { color: colors.text }]}>Back</Text>
        </TouchableOpacity>
        
        <MotiView
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500 }}
        >
          <Text style={[styles.headerTitle, { color: colors.text }]}>Weave Feed</Text>
        </MotiView>
        
        <View style={styles.placeholderView} />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {feedItems.map((item, index) => renderFeedItem(item, index))}
        
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ type: 'timing', duration: 500, delay: feedItems.length * 100 }}
          style={styles.endMessage}
        >
          <Text style={[styles.endMessageText, { color: colors.textSecondary }]}>
            You're all caught up!
          </Text>
        </MotiView>
      </ScrollView>
      
      {/* Floating post button */}
      <MotiView
        from={{ opacity: 0, scale: 0, translateY: 20 }}
        animate={{ opacity: 1, scale: 1, translateY: 0 }}
        transition={{ type: 'spring', delay: 1000 }}
        style={styles.floatingButtonContainer}
      >
        <TouchableOpacity 
          style={[styles.floatingButton, { backgroundColor: colors.primary }]}
        >
          <Ionicons name="add" size={28} color="#121212" />
        </TouchableOpacity>
      </MotiView>
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
  backText: {
    marginLeft: 4,
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholderView: {
    width: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  feedItem: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  feedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  authorInfo: {
    flex: 1,
    marginLeft: 12,
  },
  authorName: {
    fontWeight: '600',
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    marginTop: 2,
  },
  moreButton: {
    padding: 4,
  },
  contentContainer: {
    padding: 12,
    paddingTop: 0,
  },
  contentText: {
    fontSize: 15,
    lineHeight: 22,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    paddingTop: 0,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    padding: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  actionText: {
    fontSize: 14,
    marginLeft: 6,
  },
  endMessage: {
    alignItems: 'center',
    padding: 16,
  },
  endMessageText: {
    fontSize: 14,
  },
  floatingButtonContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  floatingButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
});