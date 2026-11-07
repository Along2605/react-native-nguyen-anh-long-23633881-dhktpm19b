import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { StatusBadge } from "../components/StatusBadge";
import { PrimaryButton } from "../components/PrimaryButton";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getOrdersByUser } from "../services/orderService";
import { getBooks } from "../services/bookService";
import { getErrorMessage } from "../api/client";
import { useAuth, useCart } from "../store/hooks";
import { formatDateTime } from "../utils/format";
import { showMessage } from "../utils/dialog";
import { RootScreenProps } from "../navigation/types";
import { Order, OrderStatus } from "../types";
import { colors, formatPrice, radius } from "../theme";

export const PAYMENT_LABEL = { cod: "Thanh toán khi nhận hàng (COD)", bank: "Chuyển khoản ngân hàng" } as const;

export function OrdersScreen({ navigation }: RootScreenProps<"Orders">) {
  // Câu 5: các nút lọc trạng thái
const FILTERS: { key: "all" | OrderStatus; label: string }[] = [
  { key: "all", label: "Tất cả" },
  { key: "pending", label: "Chờ xác nhận" },
  { key: "shipping", label: "Đang giao" },
  { key: "completed", label: "Hoàn tất" },
  { key: "cancelled", label: "Đã huỷ" },
];
  const { user, isLoggedIn } = useAuth();
  const { items: cartItems, add, setQty } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<number | null>(null); // đơn đang mở rộng
  const [status, setStatus] = useState<"all" | OrderStatus>("all"); // Câu 5: trạng thái đang lọc
  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getOrdersByUser(user.id);
      // sắp xếp thêm ở client cho chắc: chuỗi ISO so sánh được, mới nhất lên đầu
      setOrders([...data].sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [user]);
  useEffect(() => {
    load();
  }, [load]);

   // BT9.C1: Mua lại — thêm lại sản phẩm của đơn vào giỏ (cộng dồn, không vượt tồn kho)
  const reorder = async (order: Order) => {
    try {
      const books = await getBooks(); // lấy giá và tồn kho MỚI NHẤT (giá trong đơn cũ có thể đã đổi)
      order.items.forEach((it) => {
        const book = books.find((b) => b.id === it.bookId);
        if (!book) return; // sách đã bị xoá → bỏ qua
        const inCart = cartItems.find((c) => c.bookId === it.bookId);
        if (!inCart) {
          add({ bookId: book.id, title: book.title, price: book.price, emoji: book.emoji, color: book.color, stock: book.stock });
        }
        setQty(it.bookId, (inCart?.quantity ?? 0) + it.quantity); // setQty tự chặn ở tồn kho
      });
      showMessage("Đã thêm vào giỏ", "Các sản phẩm của đơn hàng đã được thêm lại vào giỏ.", () =>
        navigation.navigate("Tabs", { screen: "Cart" })
      );
    } catch (e) {
      showMessage("Không thể mua lại", getErrorMessage(e));
    }
  };

  if (!isLoggedIn) {
    return <EmptyState emoji="🔒" title="Bạn cần đăng nhập" actionLabel="Đăng nhập" onAction={() => navigation.navigate("Login")} />;
  }
  if (loading) return <LoadingView />;
  if (error) return <ErrorView message={error} onRetry={load} />;

    // Câu 5: dữ liệu dẫn xuất — tính lại mỗi lần render, không cần state riêng
  const shownOrders = status === "all" ? orders : orders.filter((o) => o.status === status);

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.list}
      data={shownOrders}
      ListHeaderComponent={
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {FILTERS.map((f) => {
            const active = status === f.key;
            return (
              <Pressable key={f.key} onPress={() => setStatus(f.key)} style={[styles.chip, active && styles.chipActive]}>
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{f.label}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      }
      keyExtractor={(o) => String(o.id)}
      renderItem={({ item: o }) => {
        const open = openId === o.id; // thẻ này có đang mở không?
        return (
          <Pressable style={styles.card} onPress={() => setOpenId(open ? null : o.id)}>
            <View style={styles.head}>
              <View style={{ flex: 1, gap: 2 }}>
                <Text style={styles.code}>Đơn #{o.id}</Text>
                <Text style={styles.muted}>{formatDateTime(o.createdAt)}</Text>
              </View>
              <StatusBadge status={o.status} />
            </View>
            <View style={styles.head}>
              <Text style={styles.total}>{formatPrice(o.total)}</Text>
              <Text style={styles.toggle}>Chi tiết {open ? "▲" : "▼"}</Text>
            </View>

            {open && (
              <View style={styles.detail}>
                {o.items.map((it) => (
                  <View key={it.bookId} style={styles.line}>
                    <Text style={styles.itemTitle} numberOfLines={1}>{it.title} × {it.quantity}</Text>
                    <Text style={styles.itemPrice}>{formatPrice(it.price * it.quantity)}</Text>
                  </View>
                ))}
                <Text style={styles.label}>Giao đến</Text>
                <Text style={styles.text}>{o.address.name} · {o.address.phone}</Text>
                <Text style={styles.text}>{o.address.address}</Text>
                <Text style={styles.label}>Thanh toán</Text>
                <Text style={styles.text}>{PAYMENT_LABEL[o.paymentMethod]}</Text>
                                {o.status === "completed" && (
                  <View style={{ marginTop: 8 }}>
                    <PrimaryButton title="🔁 Mua lại" variant="outline" onPress={() => reorder(o)} />
                  </View>
                )}
              </View>
            )}
          </Pressable>
        );
      }}
      ListEmptyComponent={
        <EmptyState
          emoji="🧾"
                   title={orders.length === 0 ? "Bạn chưa có đơn hàng nào" : "Không có đơn ở trạng thái này"}
          message={orders.length === 0 ? "Đặt cuốn sách đầu tiên để theo dõi đơn ở đây." : undefined}
          actionLabel="Mua sắm ngay"
          onAction={() => navigation.navigate("Tabs", { screen: "Home" })}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  list: { padding: 12, gap: 10, flexGrow: 1 },
  card: { backgroundColor: "#fff", borderRadius: radius.md, padding: 12, gap: 8 },
  head: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  code: { fontWeight: "800", color: colors.navy, fontSize: 16 },
  muted: { color: colors.muted, fontSize: 12 },
  total: { fontWeight: "800", color: colors.indigo, fontSize: 16 },
  toggle: { color: colors.indigo, fontWeight: "700" },
  detail: { borderTopWidth: 1, borderTopColor: colors.line, paddingTop: 8, gap: 4 },
  line: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  itemTitle: { flex: 1, color: colors.text },
  itemPrice: { fontWeight: "700", color: colors.text },
  label: { marginTop: 6, fontWeight: "800", color: colors.navy, fontSize: 13 },
  text: { color: colors.text },
    chips: { gap: 8, paddingBottom: 2 },
  chip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 999, backgroundColor: "#fff", borderWidth: 1, borderColor: colors.line },
  chipActive: { backgroundColor: colors.indigo, borderColor: colors.indigo },
  chipText: { color: colors.text, fontWeight: "600" },
  chipTextActive: { color: "#fff" },
});