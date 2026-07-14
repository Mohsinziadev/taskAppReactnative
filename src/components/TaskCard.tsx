import { View, Text, Pressable } from "react-native";

import { Task } from "../types/task";

type Props = {
  task: Task;
};

export default function TaskCard({ task }: Props) {
  return (
    <View className="bg-white rounded-3xl p-5 mb-4 shadow-sm">
      <View className="flex-row justify-between">
        <View className="flex-1">
          <Text className="text-xl font-bold text-slate-900">{task.title}</Text>

          <Text className="mt-2 text-slate-500">{task.description}</Text>
        </View>

        <View
          className={
            task.completed
              ? "bg-green-100 px-3 py-2 rounded-full"
              : "bg-orange-100 px-3 py-2 rounded-full"
          }
        >
          <Text
            className={task.completed ? "text-green-700" : "text-orange-700"}
          >
            {task.completed ? "Done" : "Pending"}
          </Text>
        </View>
      </View>

      <View className="flex-row mt-5 gap-3">
        <Pressable className="flex-1 bg-indigo-600 py-3 rounded-xl">
          <Text className="text-center text-white font-bold">Edit</Text>
        </Pressable>

        <Pressable className="flex-1 bg-red-400 py-3 rounded-xl">
          <Text className="text-center text-white font-bold">Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}
