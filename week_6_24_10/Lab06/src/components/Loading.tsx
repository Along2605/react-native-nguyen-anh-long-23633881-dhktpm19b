import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function Loading({ text = "Đang tải..." }: { text?: string }) {
  return (
    <View style={s.center}>
      <ActivityIndicator size="large" color={colors.blue} />
      <Text style={s.text}>{text}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12, backgroundColor: "white" },
  text: { color: colors.muted },
});
