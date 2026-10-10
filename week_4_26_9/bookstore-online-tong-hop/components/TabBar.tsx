// GIỜ 5 — Bài tập 1: Thanh Tab Bar dưới cùng (giao diện tĩnh, chưa dùng thư viện
// navigation thật — chỉ chuyển màn bằng useState ở App.tsx, đúng yêu cầu tài liệu).
//
// SO SÁNH 2 CÁCH ĐẶT TAB BAR (yêu cầu của đề):
// Cách 1 — position: 'absolute' ở đáy (cách file này đang dùng):
//   • Tab bar nổi đè lên nội dung, KHÔNG chiếm chỗ trong luồng flex.
//   • Mỗi màn hình phải tự chừa khoảng trống bằng chiều cao tab bar
//     (VD: CartScreen có marginBottom: 64); quên thì phần tử cuối bị che.
//   => Dùng khi muốn tab bar nổi/trong suốt, nội dung cuộn "chạy bên dưới" nó.
// Cách 2 — đặt cố định NGOÀI ScrollView (phần tử thường, nằm cuối View flex:1):
//   • Vùng nội dung flex:1 tự chiếm phần còn lại, tab bar chiếm đúng 64px
//     -> không bao giờ che nội dung, không cần tính padding.
//   => Dùng cho tab bar thường (nền đặc): đơn giản, ít lỗi, nên là lựa chọn mặc định.
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export type TabKey = "home" | "category" | "cart" | "account";

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: "home", label: "Trang chủ", icon: "🏠" },
  { key: "category", label: "Danh mục", icon: "📂" },
  { key: "cart", label: "Giỏ hàng", icon: "🛒" },
  { key: "account", label: "Tài khoản", icon: "👤" },
];

export function TabBar({ active, onChange }: { active: TabKey; onChange: (key: TabKey) => void }) {
  return (
    <View style={styles.bar}>
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <Pressable
            key={tab.key}
            style={styles.tabItem} // flex:1 -> 4 mục chia đều bằng nhau theo chiều ngang
            onPress={() => onChange(tab.key)}
          >
            <Text style={[styles.icon, isActive && styles.iconActive]}>{tab.icon}</Text>
            <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: "absolute", // neo cố định đáy màn hình, nổi trên ScrollView bên trên
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row", // 4 mục xếp ngang
    height: 64,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  tabItem: {
    flex: 1, // chia đều 1/4 bề rộng cho mỗi mục, không cần tính width tay
    flexDirection: "column", // icon trên, chữ dưới
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  icon: {
    fontSize: 18,
    opacity: 0.5,
  },
  iconActive: {
    opacity: 1,
  },
  label: {
    fontSize: 11,
    color: "#9CA3AF",
  },
  labelActive: {
    color: "#4338CA", // màu nổi bật cho mục đang chọn
    fontWeight: "700",
  },
});
