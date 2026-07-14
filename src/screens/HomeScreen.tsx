import { View, Text, FlatList, Pressable } from "react-native";

import TaskCard from "../components/TaskCard";

const tasks = [
  {
    id: "1",
    title: "Learn React Native",
    description: "Build Task Manager App",
    completed: false,
  },

  {
    id: "2",
    title: "Connect Backend",
    description: "Node + PostgreSQL API",
    completed: true,
  },
];

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-slate-50 px-5 pt-14">
      <Text className="text-3xl font-bold text-slate-900">My Tasks 👋</Text>

      <Text className="mt-2 text-slate-500">
        Manage your daily productivity
      </Text>

      <FlatList
        className="mt-8"
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskCard task={item} />}
      />

      <Pressable className="absolute bottom-8 right-6 h-16 w-16 rounded-full bg-indigo-600 items-center justify-center shadow-lg">
        <Text className="text-white text-3xl">+</Text>
      </Pressable>
    </View>
  );
}
