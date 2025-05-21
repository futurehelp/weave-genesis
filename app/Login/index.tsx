// app/Login/index.tsx
import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput, 
  Dimensions,
  Keyboard,
  Animated,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView, MotiText, AnimatePresence } from 'moti';
import { Easing } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../styles/ThemeProvider';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Login() {
  const { theme } = useTheme();
  const { colors } = theme;
  const router = useRouter();
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [formError, setFormError] = useState('');
  
  // References for animations
  const logoScale = useRef(new Animated.Value(1)).current;
  
  // Handle login submission with animation
  const handleLogin = () => {
    // Basic validation
    if (!email.trim() || !password.trim()) {
      setFormError('Please enter both email and password');
      
      // Shake animation for error
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      
      return;
    }
    
    setFormError('');
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/Dashboard');
    }, 1500);
  };
  
  // Logo animation when keyboard appears/disappears
  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        Animated.timing(logoScale, {
          toValue: 0.7,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    );
    
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colors.text === '#FFFFFF' ? 'light' : 'dark'} />
      
      {/* Animated background elements */}
      <MotiView
        style={[styles.backgroundShape, { backgroundColor: colors.primary }]}
        from={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.08, scale: 1 }}
        transition={{
          type: 'timing',
          duration: 1500,
          easing: Easing.out(Easing.quad),
        }}
      />
      
      <MotiView
        style={[styles.backgroundShape2, { backgroundColor: colors.primary }]}
        from={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{
          type: 'timing',
          duration: 1800,
          delay: 200,
          easing: Easing.out(Easing.quad),
        }}
      />
      
      {/* Logo and title */}
      <Animated.View 
        style={[
          styles.headerContainer, 
          { transform: [{ scale: logoScale }] }
        ]}
      >
        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 150, damping: 15 }}
        >
          <View style={styles.logoContainer}>
            <Ionicons name="layers-outline" size={48} color={colors.primary} />
          </View>
        </MotiView>
        
        <MotiText
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', delay: 300 }}
          style={[styles.title, { color: colors.text }]}
        >
          Weave
        </MotiText>
        
        <MotiText
          from={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ type: 'timing', delay: 500, duration: 500 }}
          style={[styles.subtitle, { color: colors.textSecondary }]}
        >
          No-code cloud infrastructure platform
        </MotiText>
      </Animated.View>

      <View style={styles.contentContainer}>
        {/* Form Fields with animated focus states */}
        <MotiView
          style={styles.form}
          id="login-form"
          from={{ opacity: 0, translateY: 30 }}
          animate={{ 
            opacity: 1, 
            translateY: 0,
            translateX: isShaking ? [-10, 10, -10, 0] : 0 
          }}
          transition={{ 
            type: 'timing', 
            delay: 400, 
            duration: 700,
            translateX: {
              type: 'timing',
              duration: 400
            }
          }}
        >
          {/* Email Input with animated label */}
          <MotiView
            animate={{ 
              borderColor: emailFocused 
                ? colors.primary 
                : email.length > 0 
                  ? colors.border 
                  : colors.border,
              borderWidth: emailFocused ? 2 : 1,
            }}
            transition={{ type: 'timing', duration: 200 }}
            style={[styles.inputContainer]}
          >
            <MotiView
              animate={{ 
                top: emailFocused || email.length > 0 ? -10 : 8,
                left: emailFocused || email.length > 0 ? 0 : 12,
                scale: emailFocused || email.length > 0 ? 0.8 : 1,
              }}
              transition={{ type: 'timing', duration: 200 }}
              style={[styles.floatingLabel, { backgroundColor: colors.background }]}
            >
              <Text style={[
                styles.labelText, 
                { 
                  color: emailFocused 
                    ? colors.primary 
                    : colors.textSecondary 
                }
              ]}>
                Email
              </Text>
            </MotiView>
            
            <TextInput
              style={[styles.input, { color: colors.text }]}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
            />
            
            <MotiView
              animate={{ opacity: email.length > 0 ? 1 : 0 }}
              transition={{ type: 'timing', duration: 200 }}
              style={styles.inputIcon}
            >
              <Ionicons 
                name="checkmark-circle" 
                size={20} 
                color={colors.success || 'green'} 
              />
            </MotiView>
          </MotiView>

          {/* Password Input with toggle visibility */}
          <MotiView
            animate={{ 
              borderColor: passwordFocused 
                ? colors.primary 
                : password.length > 0 
                  ? colors.border 
                  : colors.border,
              borderWidth: passwordFocused ? 2 : 1,
            }}
            style={[styles.inputContainer]}
            transition={{ type: 'timing', duration: 200 }}
          >
            <MotiView
              animate={{ 
                top: passwordFocused || password.length > 0 ? -10 : 8,
                left: passwordFocused || password.length > 0 ? 0 : 12,
                scale: passwordFocused || password.length > 0 ? 0.8 : 1,
              }}
              transition={{ type: 'timing', duration: 200 }}
              style={[styles.floatingLabel, { backgroundColor: colors.background }]}
            >
              <Text style={[
                styles.labelText, 
                { 
                  color: passwordFocused 
                    ? colors.primary 
                    : colors.textSecondary 
                }
              ]}>
                Password
              </Text>
            </MotiView>
            
            <TextInput
              style={[styles.input, { color: colors.text }]}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
            
            <TouchableOpacity 
              style={styles.inputIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons 
                name={showPassword ? "eye-off-outline" : "eye-outline"} 
                size={20} 
                color={colors.textSecondary} 
              />
            </TouchableOpacity>
          </MotiView>

          {/* Forgot password link */}
          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <MotiText
              from={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 600 }}
              style={[styles.forgotPassword, { color: colors.textSecondary }]}
            >
              Forgot password?
            </MotiText>
          </TouchableOpacity>

          {/* Error message with animation */}
          <AnimatePresence>
            {formError ? (
              <MotiView
                from={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 24 }}
                exit={{ opacity: 0, height: 0 }}
                style={styles.errorContainer}
              >
                <Ionicons name="alert-circle" size={16} color={colors.error || 'red'} />
                <Text style={[styles.errorText, { color: colors.error || 'red' }]}>
                  {formError}
                </Text>
              </MotiView>
            ) : null}
          </AnimatePresence>

          {/* Login Button with loading state */}
          <TouchableOpacity
            style={[styles.button]}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <MotiView
              animate={{ 
                backgroundColor: isLoading ? colors.primary + '80' : colors.primary,
                width: isLoading ? 50 : '100%'
              }}
              transition={{
                type: 'timing',
                duration: 300,
                backgroundColor: {
                  type: 'timing',
                  duration: 300
                }
              }}
              style={[styles.buttonInner]}
            >
              <AnimatePresence>
                {isLoading ? (
                  <MotiView
                    from={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ type: 'timing', duration: 200 }}
                    style={styles.loaderContainer}
                  >
                    <MotiView
                      animate={{ 
                        rotate: '360deg',
                      }}
                      transition={{
                        loop: true,
                        repeatReverse: false,
                        type: 'timing',
                        duration: 1000,
                      }}
                      style={styles.loader}
                    >
                      <Ionicons name="refresh" size={24} color="#121212" />
                    </MotiView>
                  </MotiView>
                ) : (
                  <MotiText
                    from={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'timing', duration: 200 }}
                    style={[styles.buttonText, { color: '#121212' }]}
                  >
                    Sign In
                  </MotiText>
                )}
              </AnimatePresence>
            </MotiView>
          </TouchableOpacity>
        </MotiView>

        {/* Divider */}
        <MotiView
          from={{ opacity: 0, width: '40%' }}
          animate={{ opacity: 1, width: '80%' }}
          transition={{ type: 'timing', delay: 600, duration: 800 }}
          style={[styles.dividerContainer, { borderBottomColor: colors.border }]}
        />

        {/* Social Login */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', delay: 700, duration: 700 }}
          style={styles.socialContainer}
        >
          <TouchableOpacity 
            style={[styles.socialButton, { borderColor: colors.border }]}
            activeOpacity={0.7}
          >
            <MotiView
              from={{ rotate: '-15deg' }}
              animate={{ rotate: '0deg' }}
              transition={{ type: 'spring', delay: 900, stiffness: 100 }}
            >
              <Ionicons name="logo-google" size={22} color={colors.text} />
            </MotiView>
            <Text style={[styles.socialText, { color: colors.text }]}>
              Sign in with Google
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.socialButton, { borderColor: colors.border, marginTop: 10 }]}
            activeOpacity={0.7}
          >
            <MotiView
              from={{ rotate: '-15deg' }}
              animate={{ rotate: '0deg' }}
              transition={{ type: 'spring', delay: 1000, stiffness: 100 }}
            >
              <Ionicons name="logo-apple" size={22} color={colors.text} />
            </MotiView>
            <Text style={[styles.socialText, { color: colors.text }]}>
              Sign in with Apple
            </Text>
          </TouchableOpacity>
        </MotiView>

        {/* Register Link - Added extra padding as requested */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', delay: 1000 }}
          style={[styles.registerContainer, { marginTop: 30 }]} 
        >
          <TouchableOpacity 
            onPress={() => router.push('/Register')}
            style={styles.registerButton}
          >
            <Text style={[styles.registerText, { color: colors.textSecondary }]}>
              Don't have an account?
            </Text>
            <MotiText
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                loop: true,
                repeatReverse: true,
                type: 'timing',
                duration: 2000,
              }}
              style={[styles.registerLink, { color: colors.primary }]}
            >
              Register
            </MotiText>
          </TouchableOpacity>
        </MotiView>
      </View>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundShape: {
    position: 'absolute',
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width * 0.75,
    top: -width * 0.5,
    left: -width * 0.25,
  },
  backgroundShape2: {
    position: 'absolute',
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width * 0.6,
    bottom: -width * 0.4,
    right: -width * 0.3,
  },
  headerContainer: { 
    alignItems: 'center', 
    marginTop: height * 0.03, // Reduced top margin
    marginBottom: 16,
  },
  logoContainer: {
    width: 70, // Smaller logo container
    height: 70,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: { 
    fontSize: 34, 
    fontWeight: 'bold',
    letterSpacing: 0.5, 
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  contentContainer: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'flex-start',
    width: '100%',
  },
  form: { 
    width: width * 0.85,
    maxWidth: 400,
  },
  inputContainer: {
    position: 'relative',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 8, // Reduced margin
    height: 50, // Smaller height
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '100%',
    height: '100%',
  },
  inputIcon: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  floatingLabel: {
    position: 'absolute',
    paddingHorizontal: 8,
    zIndex: 1,
  },
  labelText: {
    fontSize: 14,
    fontWeight: '500',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    paddingHorizontal: 4,
  },
  errorText: {
    fontSize: 12,
    marginLeft: 4,
  },
  button: {
    alignItems: 'center',
    marginTop: 16, // Reduced margin
    width: '100%',
    height: 48, // Smaller height
    overflow: 'hidden',
  },
  buttonInner: {
    height: 48, // Smaller height
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { 
    fontSize: 16, // Smaller font 
    fontWeight: 'bold',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    paddingVertical: 4,
  },
  forgotPassword: {
    fontSize: 13,
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dividerContainer: {
    width: width * 0.6,
    borderBottomWidth: 1,
    marginVertical: 20, // Reduced margin
  },
  socialContainer: { 
    width: width * 0.85, 
    maxWidth: 400,
    alignItems: 'center',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    padding: 14, // Smaller padding
    justifyContent: 'center',
    width: '100%',
  },
  socialText: { 
    marginLeft: 12, 
    fontSize: 15, // Slightly smaller font
    fontWeight: '600' 
  },
  registerContainer: {
    marginTop: 30, // Extra padding as requested
    marginBottom: Platform.OS === 'ios' ? 16 : 32,
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
  },
  registerLink: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
});