import { View, Text, Pressable } from "react-native";

export default function SplashScreen({ navigation }: any) {
  return (
    <View className="flex-1 bg-slate-50 items-center justify-center px-8">
      <View className="h-28 w-28 rounded-3xl bg-indigo-600 items-center justify-center shadow-lg">
        <Text className="text-white text-5xl font-bold">✓</Text>
      </View>

      <Text className="mt-8 text-4xl font-bold text-slate-900">TaskFlow</Text>

      <Text className="mt-3 text-center text-base text-slate-500">
        Organize your tasks beautifully and stay productive every day
      </Text>

      <Pressable
        onPress={() => navigation.navigate("Home")}
        className="mt-12 w-full rounded-2xl bg-indigo-600 py-4"
      >
        <Text className="text-center text-lg font-bold text-white">
          Get Started
        </Text>
      </Pressable>
    </View>
  );
}
