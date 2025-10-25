import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';
import { databaseService, Task } from '../../services/database';

export default function TaskListScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const router = useRouter();
  const keywordRef = useRef('');
  const [list, setList] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch all tasks when screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchAllTasks();
    }, [])
  );

  const fetchAllTasks = async () => {
    setLoading(true);
    try {
      const tasks = await databaseService.getAllTasks();
      setList(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAllTasks();
    setRefreshing(false);
  }, []);

  const searchByKeyword = useCallback(async (keyword: string) => {
    setLoading(true);
    try {
      if (keyword.trim()) {
        const tasks = await databaseService.searchTasks(keyword);
        setList(tasks);
      } else {
        await fetchAllTasks();
      }
    } catch (error) {
      console.error('Error searching tasks:', error);
      setList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    try {
      await databaseService.deleteTask(id);
      await fetchAllTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }, []);

  const handleEditTask = (item: Task) => {
    router.push({
      pathname: '/task-form',
      params: { 
        taskData: JSON.stringify(item),
        name: name as string,
      },
    });
  };

  const handleAddTask = () => {
    router.push({
      pathname: '/task-form',
      params: { name: name as string },
    });
  };

  const handleConfirmDelete = (taskId: string) => {
    Alert.alert(
      'Xác nhận xoá',
      'Bạn có chắc chắn muốn xoá task này?',
      [
        {
          text: 'Huỷ',
          style: 'cancel',
        },
        {
          text: 'Xoá',
          onPress: () => deleteTask(taskId),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const handleSearchChange = (text: string) => {
    keywordRef.current = text;
  };

  const handleSearchSubmit = () => {
    searchByKeyword(keywordRef.current);
  };

  const renderTaskItem = ({ item }: { item: Task }) => {
    return (
      <View style={styles.taskItem}>
        <Pressable
          style={styles.checkBox}
          onPress={() => handleConfirmDelete(item.id)}>
          <Image 
            source={require('../../assets/images/tick.png')} 
            style={styles.tickIcon} 
          />
        </Pressable>

        <View style={styles.taskContent}>
          <Text style={styles.taskText} numberOfLines={2}>
            {item.des}
          </Text>
        </View>

        <Pressable 
          onPress={() => handleEditTask(item)} 
          style={styles.editButton}
        >
          <Image 
            source={require('../../assets/images/pen.png')} 
            style={styles.penIcon} 
          />
        </Pressable>
      </View>
    );
  };

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Image 
            source={require('../../assets/images/back.png')} 
            style={styles.backIcon} 
          />
        </Pressable>
        <View style={styles.userInfo}>
          <Image
            source={require('../../assets/images/Avatar31.png')}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.greetingText}>Hi {name || 'User'}</Text>
            <Text style={styles.subtitleText}>Have a great day ahead</Text>
          </View>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Image
          source={require('../../assets/images/mingcute_search-fill.png')}
          style={styles.searchIcon}
        />
        <TextInput
          onChangeText={handleSearchChange}
          defaultValue={keywordRef.current}
          placeholder="Search tasks..."
          style={styles.searchInput}
          onSubmitEditing={handleSearchSubmit}
          returnKeyType="search"
        />
      </View>

      {/* Task List */}
      <FlatList
        data={list}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={['#3B82F6']}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Image 
              source={require('../../assets/images/fxemoji_note.png')} 
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyText}>No tasks yet</Text>
            <Text style={styles.emptySubtext}>Add your first task to get started!</Text>
          </View>
        }
      />

      {/* Add Task Button */}
      <Pressable style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>+</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#F9FAFB',
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  listContent: {
    paddingBottom: 100,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  checkBox: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tickIcon: {
    width: 22,
    height: 22,
  },
  taskContent: {
    flex: 1,
    marginRight: 12,
  },
  taskText: {
    fontSize: 16,
    color: '#1F2937',
    lineHeight: 22,
  },
  editButton: {
    padding: 8,
  },
  penIcon: {
    width: 22,
    height: 22,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    marginTop: 60,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    marginBottom: 20,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#D1D5DB',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#3B82F6',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 32,
    fontWeight: '300',
    lineHeight: 32,
  },
});
