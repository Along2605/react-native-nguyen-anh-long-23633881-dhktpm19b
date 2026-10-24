import React, { createContext, useContext, useMemo, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

type DrawerParamList = { Home: undefined; Profile: undefined; Settings: undefined };
const Drawer = createDrawerNavigator<DrawerParamList>();

// TODO 3 (nâng cao): đưa notify/dark lên Context để đổi nền mọi màn
type Settings = {
  notify: boolean; setNotify: (v: boolean) => void;
  dark: boolean; setDark: (v: boolean) => void;
};
const SettingsContext = createContext<Settings | null>(null);
function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings phải nằm trong SettingsContext");
  return ctx;
}
// màu nền/chữ theo chế độ tối
function useTheme() {
  const { dark } = useSettings();
  return { bg: dark ? "#111827" : "white", fg: dark ? "white" : colors.text };
}

function HomeScreen() {
  const t = useTheme();
  return (
    <View style={[s.center, { backgroundColor: t.bg }]}>
      <Text style={[s.big, { color: t.fg }]}>Xin chào 👋</Text>
    </View>
  );
}

function ProfileScreen() {
  const t = useTheme();
  return (
    <View style={[s.center, { backgroundColor: t.bg }]}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>NA</Text>
      </View>
      <Text style={[s.big, { color: t.fg }]}>Nguyễn Văn An</Text>
      <Text style={s.muted}>an.nguyen@example.com</Text>
    </View>
  );
}

// TODO 1: 2 Switch + dòng trạng thái
function SettingsScreen() {
  const { notify, setNotify, dark, setDark } = useSettings();
  const t = useTheme();
  return (
    <View style={[s.page, { backgroundColor: t.bg }]}>
      <View style={s.option}>
        <Text style={[s.label, { color: t.fg }]}>Nhận thông báo</Text>
        <Switch value={notify} onValueChange={setNotify} />
      </View>
      <View style={s.option}>
        <Text style={[s.label, { color: t.fg }]}>Chế độ tối</Text>
        <Switch value={dark} onValueChange={setDark} />
      </View>
      <Text style={[s.status, { color: t.fg }]}>
        Thông báo: {notify ? "BẬT" : "TẮT"} · Giao diện: {dark ? "tối" : "sáng"}
      </Text>
    </View>
  );
}

const ICONS: Record<keyof DrawerParamList, keyof typeof Ionicons.glyphMap> = {
  Home: "home-outline",
  Profile: "person-outline",
  Settings: "settings-outline",
};

// TODO 2
export function DrawerApp() {
  const [notify, setNotify] = useState(true);
  const [dark, setDark] = useState(false);
  const settings = useMemo(() => ({ notify, setNotify, dark, setDark }), [notify, dark]);

  return (
    <SettingsContext.Provider value={settings}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={({ route }) => ({
            drawerActiveTintColor: colors.red,
            drawerIcon: ({ color, size }) => <Ionicons name={ICONS[route.name]} size={size} color={color} />,
          })}>
          <Drawer.Screen name="Home" component={HomeScreen} options={{ title: "Trang chủ" }} />
          <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: "Cá nhân" }} />
          <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: "Cài đặt" }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SettingsContext.Provider>
  );
}

const s = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8 },
  big: { fontSize: 24, fontWeight: "bold", color: colors.text },
  muted: { color: colors.muted },
  avatar: {
    width: 96, height: 96, borderRadius: 48, backgroundColor: colors.red,
    alignItems: "center", justifyContent: "center", marginBottom: 8,
  },
  avatarText: { color: "white", fontSize: 32, fontWeight: "bold" },
  page: { flex: 1, padding: 16, gap: 8 },
  option: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.line,
  },
  label: { fontSize: 16 },
  status: { marginTop: 16, fontWeight: "bold" },
});
