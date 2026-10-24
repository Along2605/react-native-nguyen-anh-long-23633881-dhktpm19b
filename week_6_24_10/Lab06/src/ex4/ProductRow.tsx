import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Stars } from "../components/Stars";
import { PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Phone } from "../types";

export function ProductRow({ phone, onPress }: { phone: Phone; onPress: () => void }) {
  return (
    <Pressable style={s.row} onPress={onPress}>
      <Image source={PHONE_COLORS[phone.defaultColor].image} style={s.thumb} resizeMode="contain" />
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={s.name} numberOfLines={1}>{phone.name.split(" - ")[0]}</Text>
        <Stars value={phone.rating} size={13} />
        <Text style={s.price}>{formatPrice(phone.price)}</Text>
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  row: {
    flexDirection: "row", gap: 12, alignItems: "center", backgroundColor: "white",
    padding: 10, borderRadius: 8, borderWidth: 1, borderColor: colors.line,
  },
  thumb: { width: 56, height: 70 },
  name: { fontWeight: "600", color: colors.text },
  price: { color: colors.red, fontWeight: "bold" },
});
