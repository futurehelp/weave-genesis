// app/screens/ThreadBuilder/index.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '../../styles/ThemeProvider';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HEX_SIZE = 70;
const HEX_SPACING = 8;

// Service definitions
const SERVICES = [
  { id: 'webhook', name: 'Webhook', icon: 'globe-outline', color: '#FF6B6B' },
  { id: 'discord', name: 'Discord', icon: 'chatbubbles-outline', color: '#5865F2' },
  { id: 'slack', name: 'Slack', icon: 'chatbox-outline', color: '#4A154B' },
  { id: 'email', name: 'Email', icon: 'mail-outline', color: '#34A853' },
  { id: 'sms', name: 'SMS', icon: 'chatbubble-outline', color: '#FF9500' },
  { id: 'timer', name: 'Timer', icon: 'time-outline', color: '#007AFF' },
  { id: 'weather', name: 'Weather', icon: 'partly-sunny-outline', color: '#FFD60A' },
  { id: 'calendar', name: 'Calendar', icon: 'calendar-outline', color: '#FF3B30' },
  { id: 'database', name: 'Database', icon: 'server-outline', color: '#8E8E93' },
  { id: 'api', name: 'API', icon: 'code-outline', color: '#32D74B' },
  { id: 'notification', name: 'Push', icon: 'notifications-outline', color: '#AF52DE' },
  { id: 'file', name: 'File', icon: 'document-outline', color: '#FF9500' },
];

interface WorkflowStep {
  id: string;
  serviceId: string;
  position: number;
}

interface HexagonProps {
  service: typeof SERVICES[0];
  index: number;
  onDragStart: (service: typeof SERVICES[0]) => void;
  onDragEnd: () => void;
  isDragging: boolean;
}

const Hexagon: React.FC<HexagonProps> = ({ service, index, onDragStart, onDragEnd, isDragging }) => {
  const { theme } = useTheme();
  const { colors } = theme;
  
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  
  // Calculate hexagon position in honeycomb pattern
  const row = Math.floor(index / 3);
  const col = index % 3;
  const offsetX = row % 2 === 1 ? (HEX_SIZE + HEX_SPACING) / 2 : 0;
  
  const hexagonStyle = {
    left: col * (HEX_SIZE + HEX_SPACING) + offsetX,
    top: row * (HEX_SIZE * 0.75 + HEX_SPACING),
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      scale.value = withSpring(1.1);
      runOnJS(onDragStart)(service);
    },
    onActive: (event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    },
    onEnd: () => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
      runOnJS(onDragEnd)();
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ] as any,
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[
        styles.hexagonContainer, 
        hexagonStyle, 
        animatedStyle,
        { zIndex: isDragging ? 1000 : 1 }
      ]}>
        <MotiView
          from={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: 'spring', 
            delay: index * 100,
            damping: 15,
            mass: 0.8 
          }}
          style={[
            styles.hexagon,
            { 
              backgroundColor: service.color,
              shadowColor: service.color,
            }
          ]}
        >
          <Ionicons name={service.icon as any} size={28} color="white" />
          <Text style={styles.hexagonText}>{service.name}</Text>
        </MotiView>
      </Animated.View>
    </PanGestureHandler>
  );
};

interface WorkflowStepProps {
  step: WorkflowStep;
  service: typeof SERVICES[0];
  onRemove: (stepId: string) => void;
}

const WorkflowStepComponent: React.FC<WorkflowStepProps> = ({ step, service, onRemove }) => {
  const { theme } = useTheme();
  const { colors } = theme;

  return (
    <MotiView
      from={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: 'spring', damping: 15 }}
      style={[styles.workflowStep, { backgroundColor: colors.background }]}
    >
      <View style={[styles.stepIcon, { backgroundColor: service.color }]}>
        <Ionicons name={service.icon as any} size={20} color="white" />
      </View>
      <Text style={[styles.stepText, { color: colors.text }]}>{service.name}</Text>
      <TouchableOpacity onPress={() => onRemove(step.id)} style={styles.removeButton}>
        <Ionicons name="close-circle" size={20} color={colors.error} />
      </TouchableOpacity>
    </MotiView>
  );
};

export default function ThreadBuilder() {
  const { theme } = useTheme();
  const { colors } = theme;
  const router = useRouter();
  
  const [workflow, setWorkflow] = useState<WorkflowStep[]>([]);
  const [draggedService, setDraggedService] = useState<typeof SERVICES[0] | null>(null);

  const handleDragStart = (service: typeof SERVICES[0]) => {
    setDraggedService(service);
  };

  const handleDragEnd = () => {
    if (draggedService) {
      // Add to workflow
      const newStep: WorkflowStep = {
        id: `${draggedService.id}-${Date.now()}`,
        serviceId: draggedService.id,
        position: workflow.length,
      };
      setWorkflow(prev => [...prev, newStep]);
    }
    setDraggedService(null);
  };

  const removeWorkflowStep = (stepId: string) => {
    setWorkflow(prev => prev.filter(step => step.id !== stepId));
  };

  const clearWorkflow = () => {
    setWorkflow([]);
  };

  const saveWorkflow = () => {
    // TODO: Implement save functionality
    console.log('Saving workflow:', workflow);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
            <Text style={[styles.headerTitle, { color: colors.text }]}>Thread Builder</Text>
          </MotiView>
          
          <TouchableOpacity onPress={saveWorkflow} style={styles.saveButton}>
            <Ionicons name="checkmark" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Services Section */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 600 }}
            style={styles.section}
          >
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Services</Text>
            <Text style={[styles.sectionSubtitle, { color: colors.text }]}>
              Drag services below to build your workflow
            </Text>
            
            <View style={styles.honeycombGrid}>
              {SERVICES.map((service, index) => (
                <Hexagon
                  key={service.id}
                  service={service}
                  index={index}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  isDragging={draggedService?.id === service.id}
                />
              ))}
            </View>
          </MotiView>

          {/* Workflow Section */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 700, delay: 200 }}
            style={styles.section}
          >
            <View style={styles.workflowHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Workflow</Text>
              {workflow.length > 0 && (
                <TouchableOpacity onPress={clearWorkflow} style={styles.clearButton}>
                  <Text style={[styles.clearButtonText, { color: colors.error }]}>Clear</Text>
                </TouchableOpacity>
              )}
            </View>
            
            <View style={[styles.workflowContainer, { backgroundColor: colors.background }]}>
              {workflow.length === 0 ? (
                <View style={styles.emptyWorkflow}>
                  <Ionicons name="arrow-up" size={32} color={colors.text} opacity={0.3} />
                  <Text style={[styles.emptyWorkflowText, { color: colors.text }]}>
                    Drag services here to build your workflow
                  </Text>
                </View>
              ) : (
                workflow.map((step, index) => {
                  const service = SERVICES.find(s => s.id === step.serviceId)!;
                  return (
                    <View key={step.id} style={styles.workflowStepWrapper}>
                      <WorkflowStepComponent
                        step={step}
                        service={service}
                        onRemove={removeWorkflowStep}
                      />
                      {index < workflow.length - 1 && (
                        <View style={styles.workflowArrow}>
                          <Ionicons name="arrow-down" size={16} color={colors.text} opacity={0.5} />
                        </View>
                      )}
                    </View>
                  );
                })
              )}
            </View>
          </MotiView>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
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
  saveButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 24,
  },
  honeycombGrid: {
    position: 'relative',
    height: 400,
    width: '100%',
  },
  hexagonContainer: {
    position: 'absolute',
    width: HEX_SIZE,
    height: HEX_SIZE,
  },
  hexagon: {
    width: HEX_SIZE,
    height: HEX_SIZE,
    borderRadius: HEX_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  hexagonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
    textAlign: 'center',
  },
  workflowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  workflowContainer: {
    borderRadius: 16,
    padding: 20,
    minHeight: 200,
  },
  emptyWorkflow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyWorkflowText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
    opacity: 0.6,
  },
  workflowStepWrapper: {
    alignItems: 'center',
  },
  workflowStep: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginVertical: 4,
    width: '100%',
  },
  stepIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  removeButton: {
    padding: 4,
  },
  workflowArrow: {
    paddingVertical: 8,
  },
});