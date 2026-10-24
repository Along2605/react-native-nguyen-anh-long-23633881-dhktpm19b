import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Stars } from "../components/Stars";
import { PHONE_COLORS, PHONES } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { useFavorites } from "./FavoritesContext";
import type { RootProps } from "./types";

export function ProductDetailsScreen({ route }: RootProps<"ProductDetails">) {
  const { id } = route.params; // TODO 4
  const phone = PHONES.find((p) => p.id === id);
  const { has, toggle } = useFavorites(); // gọi hook TRƯỚC lệnh return sớm

  if (!phone) // TODO 5
    return (
      <View style={s.center}>
        <Text>Không tìm thấy sản phẩm #{id}</Text>
      </View>
    );

  const saved = has(phone.id);
  return (
    <ScrollView contentContainerStyle={s.content}>
      {/* TODO 6 */}
      <Image source={PHONE_COLORS[phone.defaultColor].image} style={s.image} resizeMode="contain" />
      <Text style={s.name}>{phone.name}</Text>
      <View style={s.row}>
        <Stars value={phone.rating} />
        <Text style={s.muted}>({phone.reviewCount} đánh giá)</Text>
      </View>
      <View style={s.row}>
        <Text style={s.price}>{formatPrice(phone.price)}</Text>
        <Text style={s.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
      </View>
      <Text style={s.muted}>
        Cung cấp bởi <Text style={{ fontWeight: "bold", color: colors.text }}>{phone.supplier}</Text>
      </Text>

      {/* TODO 7 */}
      <Pressable style={[s.favBtn, saved && s.favBtnOn]} onPress={() => toggle(phone.id)}>
        <Text style={[s.favText, saved && { color: "white" }]}>
          {saved ? "♥ Đã lưu" : "♡ Lưu vào yêu thích"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  content: { padding: 16, gap: 10, backgroundColor: "white", flexGrow: 1 },
  image: { width: "100%", height: 260 },
  name: { fontSize: 17, fontWeight: "600", color: colors.text },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  muted: { color: colors.muted },
  price: { fontSize: 20, fontWeight: "bold", color: colors.red },
  oldPrice: { color: colors.muted, textDecorationLine: "line-through" },
  favBtn: {
    marginTop: 12, height: 44, borderRadius: 6, borderWidth: 1, borderColor: colors.red,
    alignItems: "center", justifyContent: "center",
  },
  favBtnOn: { backgroundColor: colors.red },
  favText: { color: colors.red, fontWeight: "bold", fontSize: 16 },
});
