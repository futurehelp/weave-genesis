// components/ParallaxScrollView.tsx
import React from 'react';
import { ScrollView, View, StyleSheet, ScrollViewProps } from 'react-native';

interface ParallaxScrollViewProps extends ScrollViewProps {
  headerHeight?: number;
  renderHeader?: () => React.ReactNode;
}

const ParallaxScrollView: React.FC<ParallaxScrollViewProps> = ({
  children,
  headerHeight = 200,
  renderHeader,
  style,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {renderHeader && (
        <View style={[styles.headerContainer, { height: headerHeight }]}>
          {renderHeader()}
        </View>
      )}
      <ScrollView
        style={[styles.scrollView, style]}
        contentContainerStyle={styles.contentContainer}
        {...props}
      >
        {headerHeight > 0 && <View style={{ height: headerHeight }} />}
        {children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default ParallaxScrollView;