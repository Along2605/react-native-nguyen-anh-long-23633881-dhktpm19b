import React from "react";
import { FlatList, Text } from "react-native";
import { PHONES } from "../data/phones";
import { colors } from "../theme";
import { useFavorites } from "./FavoritesContext";
import { ProductRow } from "./ProductRow";
import type { TabProps } from "./types";

// TODO 8: lọc PHONES theo ids đã lưu
export function FavoritesTab({ navigation }: TabProps<"Favorites">) {
  const { ids } = useFavorites();
  const saved = PHONES.filter((p) => ids.includes(p.id));
  return (
    <FlatList
      data={saved}
      keyExtractor={(p) => p.id}
      contentContainerStyle={{ padding: 16, gap: 10 }}
      ListEmptyComponent={
        <Text style={{ textAlign: "center", color: colors.muted, marginTop: 24 }}>
          Chưa có sản phẩm nào được lưu.
        </Text>
      }
      renderItem={({ item }) => (
        <ProductRow phone={item} onPress={() => navigation.navigate("ProductDetails", { id: item.id })} />
      )}
    />
  );
}
