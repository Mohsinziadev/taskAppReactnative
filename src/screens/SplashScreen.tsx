import { View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default function SplashScreen({ navigation }: any) {
  return (
    <LinearGradient
      colors={["#0B1120", "#151233", "#1E1329"]}
      className="flex-1"
    >
      <StatusBar style="light" />

      <View className="flex-1 items-center justify-center px-8">
        <View className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-indigo-500/10" />
        <View className="absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-purple-500/10" />
        <View className="absolute top-24 right-6 h-16 w-16 rounded-full bg-sky-500/10" />

        <View className="h-28 w-28 rounded-[32px] overflow-hidden shadow-lg shadow-indigo-500/40">
          <LinearGradient
            colors={["#818CF8", "#A78BFA"]}
            className="h-full w-full items-center justify-center"
          >
            <Ionicons name="checkmark-done" size={52} color="white" />
          </LinearGradient>
        </View>

        <Text className="mt-8 text-4xl font-bold text-white tracking-tight">
          TaskFlow
        </Text>

        <Text className="mt-3 text-center text-base text-slate-400 leading-6 px-4">
          Organize your tasks beautifully{"\n"}and stay productive every day
        </Text>

        <View className="flex-row mt-10 gap-2">
          <View className="h-2 w-6 rounded-full bg-indigo-400" />
          <View className="h-2 w-2 rounded-full bg-slate-700" />
          <View className="h-2 w-2 rounded-full bg-slate-700" />
        </View>

        <Pressable
          onPress={() => navigation.navigate("Home")}
          className="mt-12 w-full active:opacity-80"
        >
          <LinearGradient
            colors={["#818CF8", "#A78BFA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="w-full rounded-2xl py-4 shadow-md shadow-indigo-500/40 flex-row items-center justify-center gap-2"
          >
            <Text className="text-center text-lg font-bold text-white">
              Get Started
            </Text>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </LinearGradient>
        </Pressable>
      </View>
    </LinearGradient>
  );
}
