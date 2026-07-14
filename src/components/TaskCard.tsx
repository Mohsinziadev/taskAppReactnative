import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Task } from "../types/task";

type Props = {
  task: Task;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function TaskCard({ task, onToggle, onEdit, onDelete }: Props) {
  return (
    <View className="flex-row bg-slate-800 border border-slate-700/60 rounded-3xl mb-4 overflow-hidden">
      <View
        className={
          task.completed ? "w-1.5 bg-emerald-400" : "w-1.5 bg-amber-400"
        }
      />

      <View className="flex-1 p-5">
        <View className="flex-row items-center mb-4">
          <Pressable
            onPress={onToggle}
            hitSlop={8}
            className={
              task.completed
                ? "h-6 w-6 rounded-full bg-emerald-400 items-center justify-center mr-3"
                : "h-6 w-6 rounded-full border-2 border-slate-600 mr-3"
            }
          >
            {task.completed && (
              <Ionicons name="checkmark" size={14} color="white" />
            )}
          </Pressable>

          <Text
            numberOfLines={2}
            className={
              task.completed
                ? "flex-1 text-sm font-medium text-slate-500 line-through"
                : "flex-1 text-sm font-medium text-slate-100"
            }
          >
            {task.title}
          </Text>

          <View
            className={
              task.completed
                ? "flex-row items-center gap-1 bg-emerald-500/10 px-3 py-1.5 rounded-full ml-2"
                : "flex-row items-center gap-1 bg-amber-500/10 px-3 py-1.5 rounded-full ml-2"
            }
          >
            <Ionicons
              name={task.completed ? "checkmark-circle" : "time-outline"}
              size={14}
              color={task.completed ? "#34d399" : "#fbbf24"}
            />
            <Text
              className={
                task.completed
                  ? "text-emerald-400 text-xs font-medium"
                  : "text-amber-400 text-xs font-medium"
              }
            >
              {task.completed ? "Done" : "Pending"}
            </Text>
          </View>
        </View>

        <View className="flex-row mt-3 gap-2">
          <Pressable
            onPress={onEdit}
            className="flex-1 flex-row items-center justify-center gap-1 bg-indigo-500/10 py-1.5 rounded-lg active:opacity-70"
          >
            <Ionicons name="pencil-outline" size={12} color="#A5B4FC" />
            <Text className="text-center text-indigo-300 text-xs font-medium">
              Edit
            </Text>
          </Pressable>

          <Pressable
            onPress={onDelete}
            className="flex-1 flex-row items-center justify-center gap-1 bg-rose-500/10 py-1.5 rounded-lg active:opacity-70"
          >
            <Ionicons name="trash-outline" size={12} color="#fb7185" />
            <Text className="text-center text-rose-400 text-xs font-medium">
              Delete
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
