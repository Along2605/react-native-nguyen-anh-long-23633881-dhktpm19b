// TUẦN 4 — Tổng hợp Giờ 4 + Giờ 5
// TabBar (gio5) chuyển giữa 4 tab; tab Trang chủ dùng HomeScreen + BookDetailScreen (gio4),
// tab Giỏ hàng dùng CartScreen (gio5).
import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TabBar, TabKey } from './components/TabBar';
import { CategoryChips } from './components/CategoryChips';
import { HomeScreen } from './screens/HomeScreen';
import { BookDetailScreen } from './screens/BookDetailScreen';
import { CartScreen } from './screens/CartScreen';
import { BOOKS, CART_ITEMS } from './data';

const TAB_BAR_HEIGHT = 64; // bằng height của styles.bar trong TabBar.tsx

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [cartCount, setCartCount] = useState(0);

  const selectedBook = BOOKS.find((b) => b.id === selectedBookId) ?? null;

  const changeTab = (tab: TabKey) => {
    setActiveTab(tab);
    setSelectedBookId(null); // đổi tab thì thoát khỏi màn chi tiết
  };

  function renderScreen() {
    if (activeTab === 'home') {
      return selectedBook ? (
        <BookDetailScreen
          book={selectedBook}
          onBack={() => setSelectedBookId(null)}
          onAddToCart={() => setCartCount((n) => n + 1)}
        />
      ) : (
        <HomeScreen
          cartCount={cartCount}
          onPressBook={(id) => setSelectedBookId(id)}
          onPressCart={() => changeTab('cart')}
        />
      );
    }

    if (activeTab === 'category') {
      return (
        <View style={styles.page}>
          <Text style={styles.pageTitle}>Danh mục</Text>
          <CategoryChips />
        </View>
      );
    }

    if (activeTab === 'cart') {
      return <CartScreen items={CART_ITEMS} />;
    }

    return (
      <View style={styles.page}>
        <Text style={styles.pageTitle}>Tài khoản</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      {/* body: containing block cho TabBar (position: 'absolute', bottom: 0) */}
      <View style={styles.body}>
        {/* Chừa 64px dưới đáy để màn hình không bị TabBar đè lên.
            Riêng CartScreen đã tự chừa (marginBottom: 64 ở totalBar) nên không cộng thêm. */}
        <View style={[styles.screenArea, activeTab !== 'cart' && { marginBottom: TAB_BAR_HEIGHT }]}>
          {renderScreen()}
        </View>

        <TabBar active={activeTab} onChange={changeTab} />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },
  body: { flex: 1 },
  screenArea: { flex: 1 },
  page: { flex: 1, padding: 16, backgroundColor: '#F8FAFC' },
  pageTitle: { fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 12 },
});
