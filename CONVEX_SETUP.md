# 🗄️ Convex Integration Setup

This guide walks you through setting up Convex with your Hansei React Native app using the modular configuration system.

## 📋 Prerequisites

- Node.js 24.4.1+
- npm 11.4.2+ or Bun 1.2.16+
- Convex account (sign up at [convex.dev](https://convex.dev))

## 🚀 Quick Setup

### 1. Install Convex

```bash
npm install convex
```

### 2. Enable Convex in Configuration

Edit `src/config.ts`:

```typescript
export const config: AppConfig = {
  features: {
    convex: true,  // ✅ Enable Convex
    // ... other features
  },
  services: {
    convex: {
      enabled: true,  // ✅ Enable Convex service
      // URLs will be set automatically from env vars
    },
    // ... other services
  },
  // ... rest of config
};
```

### 3. Initialize Convex Backend

```bash
npx convex dev
```

This command will:
- Prompt you to log in with GitHub
- Create a new Convex project
- Generate a `convex/` folder for your backend code
- Create `.env.local` with your deployment URLs

### 4. Set Environment Variables

The `npx convex dev` command creates a `.env.local` file. For Expo, you need to rename the variables:

```bash
# .env.local (created by Convex)
CONVEX_DEPLOYMENT=your-deployment-name
VITE_CONVEX_URL=https://your-deployment.convex.cloud

# Rename for Expo compatibility:
EXPO_PUBLIC_CONVEX_DEPLOYMENT=your-deployment-name
EXPO_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

### 5. Create Your First Schema (Optional)

Create `convex/schema.ts`:

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    text: v.string(),
    completed: v.boolean(),
    createdAt: v.number(),
  }),
  users: defineTable({
    name: v.string(),
    email: v.string(),
  }).index("by_email", ["email"]),
});
```

### 6. Create Database Functions

Create `convex/tasks.ts`:

```typescript
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all tasks
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

// Add a new task
export const add = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert("tasks", {
      text: args.text,
      completed: false,
      createdAt: Date.now(),
    });
    return taskId;
  },
});

// Toggle task completion
export const toggle = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.id);
    if (!task) throw new Error("Task not found");
    
    await ctx.db.patch(args.id, {
      completed: !task.completed,
    });
  },
});
```

## 💻 Usage in Your App

### Using the Custom Hooks

```typescript
import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useConvexQuery, useConvexMutation } from '../hooks/useConvex';
import { api } from '../../convex/_generated/api';

export default function TaskScreen() {
  const { data: tasks, isLoading, isEnabled } = useConvexQuery(api.tasks.get);
  const { mutate: addTask } = useConvexMutation(api.tasks.add);
  const { mutate: toggleTask } = useConvexMutation(api.tasks.toggle);

  // Show message if Convex is disabled
  if (!isEnabled) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-center text-gray-600">
          Convex is disabled. Enable it in src/config.ts to see tasks.
        </Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading tasks...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold mb-4">Tasks</Text>
      
      {tasks?.map((task) => (
        <TouchableOpacity
          key={task._id}
          className={`p-3 mb-2 rounded-lg ${task.completed ? 'bg-green-100' : 'bg-gray-100'}`}
          onPress={() => toggleTask({ id: task._id })}
        >
          <Text className={task.completed ? 'line-through text-gray-500' : ''}>
            {task.text}
          </Text>
        </TouchableOpacity>
      ))}
      
      <TouchableOpacity
        className="bg-blue-500 p-3 rounded-lg mt-4"
        onPress={() => addTask({ text: `New task ${Date.now()}` })}
      >
        <Text className="text-white text-center">Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}
```

## 🔧 Configuration Options

### Development vs Production

The configuration automatically detects your environment:

```typescript
// Development - shows detailed logs
if (isDevelopment) {
  console.log('✅ Convex client initialized:', convexUrl);
}

// Production - minimal logging
if (isProduction && !validation.valid) {
  throw new Error('Invalid configuration for production environment');
}
```

### Feature Toggling

You can easily disable Convex without removing code:

```typescript
// In src/config.ts
export const config: AppConfig = {
  features: {
    convex: false,  // ❌ Temporarily disable
  },
  // ... rest of config
};
```

When disabled:
- No Convex client is created
- Hooks return safe defaults
- UI can show appropriate fallback messages

## 📁 File Structure

After setup, your project will have:

```
src/
├── config.ts                 # Main configuration
├── config.example.ts         # Example configurations
├── providers/
│   └── ConvexProvider.tsx    # Conditional Convex provider
└── hooks/
    └── useConvex.ts          # Type-safe Convex hooks

convex/
├── _generated/               # Auto-generated types
├── schema.ts                 # Database schema
├── tasks.ts                  # Database functions
└── convex.json              # Convex config
```

## 🚨 Common Issues

### Environment Variables Not Working

Make sure your environment variables are prefixed with `EXPO_PUBLIC_`:

```bash
# ❌ Wrong
CONVEX_URL=https://...

# ✅ Correct
EXPO_PUBLIC_CONVEX_URL=https://...
```

### TypeScript Errors

If you see TypeScript errors about generated API types, run:

```bash
npx convex dev
```

This regenerates the types in `convex/_generated/`.

### Client Not Initializing

Check the console for error messages. The most common issue is missing or incorrect environment variables.

## 🎯 Next Steps

1. **Authentication**: Add Clerk integration for user-specific data
2. **Real-time Updates**: Convex automatically provides real-time updates
3. **File Uploads**: Use Convex's file storage capabilities
4. **Actions**: Add server-side actions for external API calls

## 📚 Resources

- [Convex Documentation](https://docs.convex.dev/)
- [React Native Quickstart](https://docs.convex.dev/quickstart/react-native)
- [Convex + Expo Examples](https://stack.convex.dev/react-native-realtime-chat-expo)