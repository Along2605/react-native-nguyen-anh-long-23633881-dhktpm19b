import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function ErrorBox({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View style={s.center}>
      <Text style={s.title}>Không tải được dữ liệu</Text>
      <Text style={s.message}>{message}</Text>
      <Pressable style={s.btn} onPress={onRetry}>
        <Text style={s.btnText}>THỬ LẠI</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10, padding: 24, backgroundColor: "white" },
  title: { fontSize: 18, fontWeight: "bold", color: colors.text },
  message: { color: colors.red, textAlign: "center" },
  btn: { backgroundColor: colors.red, paddingHorizontal: 24, paddingVertical: 10, borderRadius: 6 },
  btnText: { color: "white", fontWeight: "bold" },
});
