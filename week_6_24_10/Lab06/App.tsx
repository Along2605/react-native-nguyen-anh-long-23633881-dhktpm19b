import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { colors } from "./src/theme";
import { USING_API } from "./src/api/phoneApi";
import { SelectPhoneLocal } from "./src/ex1/SelectPhoneLocal";
import { SelectPhoneApi } from "./src/ex1/SelectPhoneApi";
import { BottomTabApp } from "./src/ex3/BottomTabApp";
import { StackTabApp } from "./src/ex4/StackTabApp";
import { DrawerApp } from "./src/ex5/DrawerApp";

const EXERCISES = [
  { title: "Bài 1: Select Phone", sub: "Stack + truyền params", Comp: SelectPhoneLocal },
  { title: "Bài 2: Gắn API", sub: USING_API ? "Đang dùng API thật" : "Chưa đặt EXPO_PUBLIC_API_URL → dữ liệu mẫu", Comp: SelectPhoneApi },
  { title: "Bài 3: Bottom Tab", sub: "Home / Search / Profile", Comp: BottomTabApp },
  { title: "Bài 4: Stack + Tab + Params", sub: "Products → ProductDetails, Favorites", Comp: StackTabApp },
  { title: "Bài 5: Drawer", sub: "Home / Profile / Settings", Comp: DrawerApp },
];

export default function App() {
  const [ex, setEx] = useState<number | null>(null); // null = đang ở menu

  if (ex !== null) {
    const { Comp } = EXERCISES[ex];
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
          <Pressable style={s.back} onPress={() => setEx(null)}>
            <Text style={s.backText}>← Menu</Text>
          </Pressable>
          <View style={{ flex: 1 }}>
            <Comp />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={s.root}>
        <Text style={s.title}>Lab 06 · Navigation</Text>
        {EXERCISES.map((e, i) => (
          <Pressable key={e.title} style={s.item} onPress={() => setEx(i)}>
            <Text style={s.itemTitle}>{e.title}</Text>
            <Text style={s.itemSub}>{e.sub}</Text>
          </Pressable>
        ))}
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, padding: 16, gap: 10, backgroundColor: colors.bg },
  title: { fontSize: 24, fontWeight: "bold", color: colors.navy, marginBottom: 8 },
  item: { backgroundColor: "white", padding: 16, borderRadius: 10, borderWidth: 1, borderColor: colors.line },
  itemTitle: { fontSize: 16, fontWeight: "bold", color: colors.text },
  itemSub: { color: colors.muted, marginTop: 4 },
  back: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: colors.navy },
  backText: { color: "white", fontWeight: "bold" },
});
