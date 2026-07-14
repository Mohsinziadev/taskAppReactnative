import { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Task } from "../types/task";

type Props = {
  visible: boolean;
  initialTask?: Task | null;
  submitting?: boolean;
  onClose: () => void;
  onSubmit: (title: string) => void;
};

export default function TaskFormModal({
  visible,
  initialTask,
  submitting,
  onClose,
  onSubmit,
}: Props) {
  const [title, setTitle] = useState("");
  const isEdit = !!initialTask;

  useEffect(() => {
    if (visible) setTitle(initialTask?.title ?? "");
  }, [visible, initialTask]);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1 justify-end bg-black/70"
      >
        <Pressable className="flex-1" onPress={onClose} />

        <View className="bg-slate-800 border-t border-slate-700/60 rounded-t-[32px] px-6 pt-6 pb-10">
          <View className="h-1.5 w-12 bg-slate-600 rounded-full self-center mb-5" />

          <Text className="text-xl font-bold text-white">
            {isEdit ? "Edit Task" : "New Task"}
          </Text>
          <Text className="mt-1 text-slate-400">
            {isEdit
              ? "Update your task details"
              : "What do you need to get done?"}
          </Text>

          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Task title"
            placeholderTextColor="#64748b"
            autoFocus
            className="my-5 bg-slate-900 border border-slate-700/60 rounded-2xl px-4 py-4 text-base text-white"
          />

          <View className="flex-row mt-4 gap-3">
            <Pressable
              onPress={onClose}
              className="flex-1 py-3 rounded-xl bg-slate-700 items-center active:opacity-70"
            >
              <Text className="text-sm font-semibold text-slate-300">
                Cancel
              </Text>
            </Pressable>

            <Pressable
              onPress={() => title.trim() && onSubmit(title.trim())}
              disabled={submitting || !title.trim()}
              className="flex-1 flex-row items-center justify-center gap-1.5 py-3 rounded-xl bg-indigo-500 active:opacity-70"
              style={{ opacity: submitting || !title.trim() ? 0.5 : 1 }}
            >
              <Ionicons
                name={isEdit ? "checkmark" : "add"}
                size={15}
                color="white"
              />
              <Text className="text-sm font-semibold text-white">
                {isEdit ? "Save" : "Add Task"}
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
