// app/Register/index.tsx
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

export default function Register() {
  const { theme } = useTheme();
  const { colors } = theme;
  const router = useRouter();
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [formError, setFormError] = useState('');
  
  // References for animations
  const logoScale = useRef(new Animated.Value(1)).current;
  
  // Handle register submission with animation
  const handleRegister = () => {
    // Basic validation
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setFormError('Please fill in all fields');
      
      // Shake animation for error
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      
      return;
    }
    
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      
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
      router.push('/RegisterSuccess');
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
      
      {/* Back button */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>
      
      {/* Title */}
      <Animated.View 
        style={[
          styles.headerContainer, 
          { transform: [{ scale: logoScale }] }
        ]}
      >
        <MotiText
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', delay: 300 }}
          style={[styles.title, { color: colors.text }]}
        >
          Create your account
        </MotiText>
        
        <MotiText
          from={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ type: 'timing', delay: 500, duration: 500 }}
          style={[styles.subtitle, { color: colors.textSecondary }]}
        >
          Join Weave and start building
        </MotiText>
      </Animated.View>

      <View style={styles.contentContainer}>
        {/* Form Fields with animated focus states */}
        <MotiView
          style={styles.form}
          id="register-form"
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
          
          {/* Confirm Password Input with toggle visibility */}
          <MotiView
            animate={{ 
              borderColor: confirmPasswordFocused 
                ? colors.primary 
                : confirmPassword.length > 0 
                  ? colors.border 
                  : colors.border,
              borderWidth: confirmPasswordFocused ? 2 : 1,
            }}
            style={[styles.inputContainer]}
            transition={{ type: 'timing', duration: 200 }}
          >
            <MotiView
              animate={{ 
                top: confirmPasswordFocused || confirmPassword.length > 0 ? -10 : 8,
                left: confirmPasswordFocused || confirmPassword.length > 0 ? 0 : 12,
                scale: confirmPasswordFocused || confirmPassword.length > 0 ? 0.8 : 1,
              }}
              transition={{ type: 'timing', duration: 200 }}
              style={[styles.floatingLabel, { backgroundColor: colors.background }]}
            >
              <Text style={[
                styles.labelText, 
                { 
                  color: confirmPasswordFocused 
                    ? colors.primary 
                    : colors.textSecondary 
                }
              ]}>
                Confirm Password
              </Text>
            </MotiView>
            
            <TextInput
              style={[styles.input, { color: colors.text }]}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              onFocus={() => setConfirmPasswordFocused(true)}
              onBlur={() => setConfirmPasswordFocused(false)}
            />
            
            <TouchableOpacity 
              style={styles.inputIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons 
                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                size={20} 
                color={colors.textSecondary} 
              />
            </TouchableOpacity>
          </MotiView>

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

          {/* Register Button with loading state */}
          <TouchableOpacity
            style={[styles.button]}
            onPress={handleRegister}
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
                    Register
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

        {/* Social signup */}
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
              Sign up with Google
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
              Sign up with Apple
            </Text>
          </TouchableOpacity>
        </MotiView>

        {/* Login Link */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', delay: 1000 }}
          style={[styles.loginContainer, { marginTop: 30 }]}
        >
          <TouchableOpacity 
            onPress={() => router.replace('/Login')}
            style={styles.loginButton}
          >
            <Text style={[styles.loginText, { color: colors.textSecondary }]}>
              Already have an account?
            </Text>
            <MotiText
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                loop: true,
                repeatReverse: true,
                type: 'timing',
                duration: 2000,
              }}
              style={[styles.loginLink, { color: colors.primary }]}
            >
              Log In
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
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 16,
    left: 16,
    zIndex: 10,
    padding: 8,
  },
  headerContainer: { 
    alignItems: 'center', 
    marginTop: height * 0.08, // Adjusted for back button
    marginBottom: 16,
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold',
    letterSpacing: 0.5, 
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
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
    marginTop: 30,
    marginBottom: 20,
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
  loginContainer: {
    marginTop: 30, // Extra padding
    marginBottom: Platform.OS === 'ios' ? 16 : 32,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
});