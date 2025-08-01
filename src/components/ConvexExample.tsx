import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useConvexQuery, useConvexMutation, useConvexEnabled } from '../hooks/useConvex';
// Note: This import will work after running 'npx convex dev'
// import { api } from '../../convex/_generated/api';

export default function ConvexExample() {
  const [newTaskText, setNewTaskText] = useState('');
  const isConvexEnabled = useConvexEnabled();

  // Uncomment these lines after setting up Convex backend
  // const { data: tasks, isLoading } = useConvexQuery(api.tasks.get);
  // const { mutate: addTask } = useConvexMutation(api.tasks.add);
  // const { mutate: toggleTask } = useConvexMutation(api.tasks.toggle);

  // Mock data for demonstration when Convex is not set up
  const mockTasks = [
    { _id: '1', text: 'Learn React Native', completed: false },
    { _id: '2', text: 'Set up Convex', completed: true },
    { _id: '3', text: 'Build amazing app', completed: false },
  ];

  const handleAddTask = () => {
    if (!newTaskText.trim()) return;
    
    if (isConvexEnabled) {
      // Uncomment when Convex is set up
      // addTask({ text: newTaskText });
      Alert.alert('Convex Ready', 'Uncomment the addTask call in ConvexExample.tsx');
    } else {
      Alert.alert('Demo Mode', `Would add task: "${newTaskText}"`);
    }
    
    setNewTaskText('');
  };

  const handleToggleTask = (taskId: string) => {
    if (isConvexEnabled) {
      // Uncomment when Convex is set up
      // toggleTask({ id: taskId });
      Alert.alert('Convex Ready', 'Uncomment the toggleTask call in ConvexExample.tsx');
    } else {
      Alert.alert('Demo Mode', `Would toggle task: ${taskId}`);
    }
  };

  // Show Convex status
  const ConvexStatus = () => (
    <View className="bg-gray-100 p-4 rounded-lg mb-4">
      <Text className="font-semibold mb-2">
        🗄️ Convex Status: {isConvexEnabled ? '✅ Enabled' : '❌ Disabled'}
      </Text>
      {!isConvexEnabled && (
        <Text className="text-sm text-gray-600">
          Enable Convex in src/config.ts and follow CONVEX_SETUP.md to get started.
        </Text>
      )}
      {isConvexEnabled && (
        <Text className="text-sm text-gray-600">
          Convex is enabled! Complete the setup in CONVEX_SETUP.md to use real data.
        </Text>
      )}
    </View>
  );

  return (
    <ScrollView className="flex-1 p-4">
      <Text className="text-2xl font-bold mb-4">📋 Task Manager</Text>
      
      <ConvexStatus />

      {/* Add Task Input */}
      <View className="mb-6">
        <Text className="text-lg font-semibold mb-2">Add New Task</Text>
        <View className="flex-row gap-2">
          <TextInput
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
            placeholder="Enter task description"
            value={newTaskText}
            onChangeText={setNewTaskText}
            onSubmitEditing={handleAddTask}
          />
          <TouchableOpacity
            className="bg-blue-500 px-4 py-2 rounded-lg justify-center"
            onPress={handleAddTask}
          >
            <Text className="text-white font-semibold">Add</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tasks List */}
      <View>
        <Text className="text-lg font-semibold mb-3">
          Tasks {isConvexEnabled ? '(Demo Data)' : '(Mock Data)'}
        </Text>
        
        {/* Show loading state when Convex is enabled */}
        {isConvexEnabled && (
          <View className="bg-yellow-100 p-3 rounded-lg mb-3">
            <Text className="text-sm text-yellow-800">
              ⚠️ Complete Convex setup to see real data. Currently showing mock data.
            </Text>
          </View>
        )}

        {mockTasks.map((task) => (
          <TouchableOpacity
            key={task._id}
            className={`p-4 mb-2 rounded-lg border ${
              task.completed 
                ? 'bg-green-50 border-green-200' 
                : 'bg-white border-gray-200'
            }`}
            onPress={() => handleToggleTask(task._id)}
          >
            <View className="flex-row items-center">
              <View className={`w-5 h-5 rounded-full border-2 mr-3 ${
                task.completed 
                  ? 'bg-green-500 border-green-500' 
                  : 'border-gray-400'
              }`}>
                {task.completed && (
                  <Text className="text-white text-xs text-center leading-4">✓</Text>
                )}
              </View>
              <Text className={`flex-1 ${
                task.completed 
                  ? 'line-through text-gray-500' 
                  : 'text-gray-900'
              }`}>
                {task.text}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Setup Instructions */}
      <View className="mt-6 bg-blue-50 p-4 rounded-lg">
        <Text className="font-semibold text-blue-900 mb-2">🚀 Next Steps:</Text>
        <Text className="text-sm text-blue-800 mb-1">
          1. Enable Convex in src/config.ts: convex: true
        </Text>
        <Text className="text-sm text-blue-800 mb-1">
          2. Run: npm install convex
        </Text>
        <Text className="text-sm text-blue-800 mb-1">
          3. Run: npx convex dev
        </Text>
        <Text className="text-sm text-blue-800">
          4. Follow CONVEX_SETUP.md for complete setup
        </Text>
      </View>
    </ScrollView>
  );
}