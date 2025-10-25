import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const [text, setText] = useState('');
  const router = useRouter();

  const handleGetStarted = () => {
    if (text.trim()) {
      router.push({
        pathname: '/(tabs)',
        params: { name: text },
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={require('../assets/images/Image_95.png')} 
          style={styles.logo} 
        />
        <Text style={styles.title}>MANAGE YOUR TASK</Text>
        
        <View style={styles.inputContainer}>
          <Image
            source={require('../assets/images/fxemoji_note.png')}
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Enter your name"
            value={text}
            onChangeText={setText}
            style={styles.input}
          />
        </View>
        
        <Pressable 
          style={[styles.button, !text.trim() && styles.buttonDisabled]} 
          onPress={handleGetStarted}
          disabled={!text.trim()}
        >
          <Text style={styles.buttonText}>Get Started →</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    color: '#8B5CF6',
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    width: '100%',
    maxWidth: 350,
    marginBottom: 20,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#93C5FD',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

