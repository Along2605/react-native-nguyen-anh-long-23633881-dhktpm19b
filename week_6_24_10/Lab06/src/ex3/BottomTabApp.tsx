import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { PHONES } from "../data/phones";
import { colors, formatPrice } from "../theme";

type TabParamList = { Home: undefined; Search: undefined; Profile: undefined };
const Tab = createBottomTabNavigator<TabParamList>();

// tên icon: [khi chọn, khi không chọn]
const ICONS: Record<keyof TabParamList, [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]> = {
  Home: ["home", "home-outline"],
  Search: ["search", "search-outline"],
  Profile: ["person", "person-outline"],
};

const shortName = (name: string) => name.split(" - ")[0];

function HomeTab() {
  return (
    <FlatList
      data={PHONES}
      keyExtractor={(p) => p.id}
      contentContainerStyle={{ padding: 16, gap: 10 }}
      renderItem={({ item }) => (
        <View style={s.card}>
          <Text style={s.cardName}>{shortName(item.name)}</Text>
          <Text style={s.cardPrice}>{formatPrice(item.price)}</Text>
        </View>
      )}
    />
  );
}

// TODO 1: ô tìm kiếm + lọc không phân biệt hoa/thường
function SearchTab() {
  const [keyword, setKeyword] = useState("");
  const results = useMemo(() => {
    const k = keyword.trim().toLowerCase();
    return PHONES.filter((p) => p.name.toLowerCase().includes(k));
  }, [keyword]);

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Nhập từ khóa"
        style={s.input}
      />
      <FlatList
        data={results}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{ padding: 16, paddingTop: 0, gap: 10 }}
        ListEmptyComponent={<Text style={s.empty}>Không có kết quả cho “{keyword}”.</Text>}
        renderItem={({ item }) => (
          <View style={s.card}>
            <Text style={s.cardName}>{shortName(item.name)}</Text>
            <Text style={s.cardPrice}>{formatPrice(item.price)}</Text>
          </View>
        )}
      />
    </View>
  );
}

// TODO 2: Avatar + tên + email, canh giữa
function ProfileTab() {
  const name = "Nguyễn Anh Long";
  return (
    <View style={s.center}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>{name.split(" ").pop()?.[0]}</Text>
      </View>
      <Text style={s.big}>{name}</Text>
      <Text style={s.muted}>long.nguyen@example.com</Text>
    </View>
  );
}

// TODO 3
export function BottomTabApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: colors.red,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={ICONS[route.name][focused ? 0 : 1]} size={size} color={color} />
          ),
        })}>
        <Tab.Screen name="Home" component={HomeTab} options={{ title: "Trang chủ" }} />
        <Tab.Screen name="Search" component={SearchTab} options={{ title: "Tìm kiếm" }} />
        <Tab.Screen name="Profile" component={ProfileTab} options={{ title: "Cá nhân" }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: "white", padding: 14, borderRadius: 8, borderWidth: 1, borderColor: colors.line,
    flexDirection: "row", justifyContent: "space-between",
  },
  cardName: { color: colors.text, fontWeight: "600" },
  cardPrice: { color: colors.red, fontWeight: "bold" },
  input: {
    margin: 16, borderWidth: 1, borderColor: colors.line, borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 10, backgroundColor: "white",
  },
  empty: { textAlign: "center", color: colors.muted, marginTop: 24 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8 },
  avatar: {
    width: 96, height: 96, borderRadius: 48, backgroundColor: colors.red,
    alignItems: "center", justifyContent: "center", marginBottom: 8,
  },
  avatarText: { color: "white", fontSize: 40, fontWeight: "bold" },
  big: { fontSize: 22, fontWeight: "bold", color: colors.text },
  muted: { color: colors.muted },
});
