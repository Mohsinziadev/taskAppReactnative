import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import TaskCard from "../components/TaskCard";
import TaskFormModal from "../components/TaskFormModal";
import { Task } from "../types/task";
import * as api from "../api/tasks";

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const loadTasks = useCallback(async () => {
    try {
      setError(null);
      const data = await api.fetchTasks();
      setTasks(data);
    } catch (err: any) {
      setError(err.message ?? "Failed to load tasks");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const onRefresh = () => {
    setRefreshing(true);
    loadTasks();
  };

  const openAddModal = () => {
    setEditingTask(null);
    setModalVisible(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setModalVisible(true);
  };

  const handleSubmit = async (title: string) => {
    setSubmitting(true);
    try {
      if (editingTask) {
        console.log("editingTask", editingTask);
        const updated = await api.updateTask(editingTask.id, {
          title,
          completed: editingTask.completed,
        });
        setTasks((prev) =>
          prev.map((t) => (t.id === updated.id ? updated : t))
        );
      } else {
        const created = await api.createTask(title);
        setTasks((prev) => [created, ...prev]);
      }
      setModalVisible(false);
    } catch (err: any) {
      console.log("error ", err);
      Alert.alert("Something went wrong", err.message ?? "Please try again");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (task: Task) => {
    const next = { ...task, completed: !task.completed };
    setTasks((prev) => prev.map((t) => (t.id === task.id ? next : t)));
    try {
      await api.updateTask(task.id, {
        title: task.title,
        completed: next.completed,
      });
    } catch (err: any) {
      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
      Alert.alert("Couldn't update task", err.message ?? "Please try again");
    }
  };

  const handleDelete = (task: Task) => {
    Alert.alert("Delete task", `Delete "${task.title}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const previous = tasks;
          setTasks((cur) => cur.filter((t) => t.id !== task.id));
          try {
            await api.deleteTask(task.id);
          } catch (err: any) {
            setTasks(previous);
            Alert.alert(
              "Couldn't delete task",
              err.message ?? "Please try again"
            );
          }
        },
      },
    ]);
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <LinearGradient colors={["#0B1120", "#12172A"]} className="flex-1">
      <StatusBar style="light" />

      <View className="flex-1 px-5 pt-16">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-xs font-semibold text-indigo-300 uppercase tracking-widest">
              Good Morning
            </Text>
            <Text className="mt-1 text-3xl font-bold text-white tracking-tight">
              My Tasks
            </Text>
            <Text className="mt-1 text-slate-400">
              Manage your daily productivity
            </Text>
          </View>

          <View className="h-12 w-12 rounded-2xl bg-slate-800 border border-slate-700/60 items-center justify-center">
            <Ionicons name="sparkles-outline" size={22} color="#A5B4FC" />
          </View>
        </View>

        <View className="flex-row mt-6 gap-3">
          <View className="flex-1 bg-slate-800 border border-slate-700/60 rounded-2xl p-4">
            <Text className="text-2xl font-bold text-white">
              {tasks.length}
            </Text>
            <Text className="mt-0.5 text-slate-400 text-xs font-medium">
              Total Tasks
            </Text>
          </View>

          <View className="flex-1 bg-slate-800 border border-slate-700/60 rounded-2xl p-4">
            <Text className="text-2xl font-bold text-emerald-400">
              {completedCount}
            </Text>
            <Text className="mt-0.5 text-slate-400 text-xs font-medium">
              Completed
            </Text>
          </View>

          <View className="flex-1 bg-slate-800 border border-slate-700/60 rounded-2xl p-4">
            <Text className="text-2xl font-bold text-amber-400">
              {tasks.length - completedCount}
            </Text>
            <Text className="mt-0.5 text-slate-400 text-xs font-medium">
              Pending
            </Text>
          </View>
        </View>

        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator color="#818CF8" size="large" />
            <Text className="mt-3 text-slate-400">Loading tasks…</Text>
          </View>
        ) : error ? (
          <View className="flex-1 items-center justify-center px-8">
            <Ionicons name="cloud-offline-outline" size={40} color="#64748b" />
            <Text className="mt-3 text-center text-slate-400">{error}</Text>
            <Pressable
              onPress={loadTasks}
              className="mt-4 bg-indigo-500/10 px-5 py-3 rounded-xl active:opacity-70"
            >
              <Text className="text-indigo-300 font-semibold">Retry</Text>
            </Pressable>
          </View>
        ) : tasks.length === 0 ? (
          <View className="flex-1 items-center justify-center px-8">
            <Ionicons
              name="checkmark-done-circle-outline"
              size={48}
              color="#64748b"
            />
            <Text className="mt-3 text-center text-slate-400">
              No tasks yet. Tap + to add your first task.
            </Text>
          </View>
        ) : (
          <FlatList
            className="mt-7"
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            data={tasks}
            keyExtractor={(item) => String(item.id)}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#818CF8"
              />
            }
            renderItem={({ item }) => (
              <TaskCard
                task={item}
                onToggle={() => handleToggle(item)}
                onEdit={() => openEditModal(item)}
                onDelete={() => handleDelete(item)}
              />
            )}
          />
        )}
      </View>

      <Pressable
        onPress={openAddModal}
        className="absolute bottom-8 right-6 shadow-lg shadow-indigo-500/40 active:opacity-80"
      >
        <LinearGradient
          colors={["#818CF8", "#A78BFA"]}
          className="h-16 w-16 rounded-full items-center justify-center"
        >
          <Ionicons name="add" size={30} color="white" />
        </LinearGradient>
      </Pressable>

      <TaskFormModal
        visible={modalVisible}
        initialTask={editingTask}
        submitting={submitting}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
      />
    </LinearGradient>
  );
}
