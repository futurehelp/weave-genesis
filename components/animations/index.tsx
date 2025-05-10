// components/animations/index.tsx
import React, { ReactNode } from 'react';
import { MotiView } from 'moti';
import { StyleProp, ViewStyle } from 'react-native';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  style?: StyleProp<ViewStyle>;
}

export const FadeIn: React.FC<FadeInProps> = ({ 
  children, 
  delay = 0, 
  duration = 500, 
  style = {}
}) => {
  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'timing', delay, duration }}
      style={style}
    >
      {children}
    </MotiView>
  );
};