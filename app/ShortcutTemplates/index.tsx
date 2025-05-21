// app/ShortcutTemplates/index.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../styles/ThemeProvider';
import { useRouter } from 'expo-router';

// Example template data
const templateData = [
  { id: '1', name: 'Basic Web Server', description: 'Simple web server with nginx', icon: 'globe-outline' as const },
  { id: '2', name: 'Database Cluster', description: 'MySQL database with replicas', icon: 'server-outline' as const },
  { id: '3', name: 'Static Website', description: 'S3 hosted static site with CDN', icon: 'document-outline' as const },
  { id: '4', name: 'Serverless API', description: 'API Gateway with Lambda functions', icon: 'code-slash-outline' as const },
  { id: '5', name: 'Kubernetes Cluster', description: 'Managed K8s with autoscaling', icon: 'apps-outline' as const },
];

export default function ShortcutTemplates() {
  const { theme } = useTheme();
  const { colors } = theme;
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleSelectTemplate = (id: string) => {
    setSelectedTemplate(id);
    // Navigate or perform action with selected template
    setTimeout(() => {
      router.push('/TemplateConfig');
    }, 300);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Shortcut Templates</Text>
        <View style={{ width: 24 }} />
      </View>

      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Select a template to quickly create your infrastructure
      </Text>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {templateData.map((template, index) => (
          <MotiView
            key={template.id}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ 
              type: 'timing', 
              delay: 300 + index * 100, 
              duration: 500 
            }}
          >
            <TouchableOpacity
              style={[
                styles.templateItem,
                { 
                  backgroundColor: colors.card,
                  borderColor: selectedTemplate === template.id ? colors.primary : colors.border
                }
              ]}
              onPress={() => handleSelectTemplate(template.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
                <Ionicons name={template.icon} size={28} color={colors.primary} />
              </View>
              <View style={styles.templateContent}>
                <Text style={[styles.templateName, { color: colors.text }]}>
                  {template.name}
                </Text>
                <Text style={[styles.templateDescription, { color: colors.textSecondary }]}>
                  {template.description}
                </Text>
              </View>
              <Ionicons 
                name="chevron-forward" 
                size={20} 
                color={colors.textSecondary} 
              />
            </TouchableOpacity>
          </MotiView>
        ))}
      </ScrollView>

      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', delay: 800 }}
        style={styles.footerContainer}
      >
        <TouchableOpacity 
          style={[styles.createButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/CustomTemplate')}
        >
          <Ionicons name="add" size={22} color="#121212" />
          <Text style={styles.createButtonText}>Create Custom Template</Text>
        </TouchableOpacity>
      </MotiView>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 24,
  },
  scrollView: {
    flex: 1,
  },
  templateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  templateContent: {
    flex: 1,
  },
  templateName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  templateDescription: {
    fontSize: 13,
  },
  footerContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  createButtonText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});