import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Pressable, 
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { databaseService, Task } from '../services/database';

export default function TaskFormScreen() {
  const [taskText, setTaskText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);
  
  const router = useRouter();
  const params = useLocalSearchParams<{ name: string; taskData?: string }>();
  const userName = params.name;

  useEffect(() => {
    if (params.taskData) {
      try {
        const task: Task = JSON.parse(params.taskData);
        setTaskText(task.des || '');
        setTaskId(task.id);
        setIsEditMode(true);
      } catch (error) {
        console.error('Error parsing task data:', error);
      }
    }
  }, [params.taskData]);

  const createTask = useCallback(async (des: string) => {
    try {
      const task = await databaseService.createTask(des);
      console.log('Task created:', task);
      return true;
    } catch (error) {
      console.error('Error creating task:', error);
      return false;
    }
  }, []);

  const updateTask = useCallback(async (id: string, des: string) => {
    try {
      const task = await databaseService.updateTask(id, des);
      console.log('Task updated:', task);
      return task !== null;
    } catch (error) {
      console.error('Error updating task:', error);
      return false;
    }
  }, []);

  const handleFinish = async () => {
    if (!taskText.trim()) {
      return;
    }

    setIsLoading(true);
    
    let success = false;
    
    if (isEditMode && taskId) {
      success = await updateTask(taskId, taskText.trim());
    } else {
      success = await createTask(taskText.trim());
    }

    setIsLoading(false);

    if (success) {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <Pressable onPress={() => router.back()}>
              <Image 
                source={require('../assets/images/back.png')} 
                style={styles.backIcon} 
              />
            </Pressable>
            <View style={styles.userInfo}>
              <Image 
                source={require('../assets/images/Avatar31.png')} 
                style={styles.avatar} 
              />
              <View>
                <Text style={styles.greetingText}>Hi {userName || 'User'}</Text>
                <Text style={styles.subtitleText}>
                  {isEditMode ? 'Edit your task' : 'Create new task'}
                </Text>
              </View>
            </View>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.title}>
              {isEditMode ? 'EDIT YOUR JOB' : 'ADD YOUR JOB'}
            </Text>

            <View style={styles.inputWrapper}>
              <Image
                source={require('../assets/images/fxemoji_note.png')}
                style={styles.inputIcon}
              />
              <TextInput
                onChangeText={setTaskText}
                value={taskText}
                placeholder="Input your job"
                style={styles.input}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                autoFocus
              />
            </View>

            <Pressable 
              style={[
                styles.finishButton,
                (!taskText.trim() || isLoading) && styles.finishButtonDisabled
              ]} 
              onPress={handleFinish}
              disabled={!taskText.trim() || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.finishButtonText}>
                  {isEditMode ? 'Update →' : 'Finish →'}
                </Text>
              )}
            </Pressable>

            <Image
              source={require('../assets/images/Image_95.png')}
              style={styles.bottomImage}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  greetingText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  subtitleText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  title: {
    color: '#8B5CF6',
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 40,
    textAlign: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: '100%',
    maxWidth: 400,
    marginBottom: 30,
    backgroundColor: '#F9FAFB',
  },
  inputIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
    marginTop: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    minHeight: 100,
    color: '#1F2937',
  },
  finishButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 40,
    minWidth: 140,
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  finishButtonDisabled: {
    backgroundColor: '#93C5FD',
    shadowOpacity: 0,
    elevation: 0,
  },
  finishButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomImage: {
    width: 150,
    height: 150,
    opacity: 0.3,
    resizeMode: 'contain',
  },
});

