// GIỜ 4 — Bài tập 2: Màn hình Chi tiết sách
// Cấu trúc 3 vùng giống Home (đúng hình minh hoạ của đề):
//   1. Ảnh bìa lớn cố định phía trên — NGOÀI ScrollView, không cuộn.
//   2. ScrollView riêng (flex:1) chứa tên, tác giả, giá, mô tả dài — cuộn được.
//   3. Thanh "Thêm vào giỏ" cố định dưới cùng — NGOÀI ScrollView.
import React from "react";
import { View, ScrollView, Text, Image, Pressable, StyleSheet } from "react-native";
import { Book } from "../data";

export function BookDetailScreen({
  book,
  onBack,
  onAddToCart,
}: {
  book: Book;
  onBack: () => void;
  onAddToCart: () => void;
}) {
  return (
    <View style={styles.screen}>
      <Pressable style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← Quay lại</Text>
      </Pressable>

      {/* 1. Ảnh bìa lớn: nằm NGOÀI ScrollView -> đứng yên khi cuộn phần mô tả.
          alignSelf:'center' ghi đè alignItems của View cha để riêng ảnh này
          được căn giữa theo chiều ngang. */}
      <Image source={{ uri: book.cover }} style={styles.cover} />

      {/* 2. ScrollView riêng flex:1 chỉ chứa phần chữ dài -> mô tả dài bao nhiêu
          cũng không đẩy tràn thanh "Thêm vào giỏ" cố định phía dưới. */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
        <Text style={styles.price}>{book.price.toLocaleString()} đ</Text>
        <Text style={styles.description}>{book.description}</Text>
      </ScrollView>

      {/* 3. Thanh dưới cùng: row, 2 đầu cách xa nhau, KHÔNG nằm trong ScrollView
          -> luôn đứng yên một chỗ dù nội dung mô tả dài bao nhiêu. */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomPrice}>{book.price.toLocaleString()} đ</Text>
        <Pressable style={styles.addButton} onPress={onAddToCart}>
          <Text style={styles.addButtonText}>Thêm vào giỏ</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backText: {
    color: "#4338CA",
    fontWeight: "600",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  cover: {
    alignSelf: "center", // căn giữa riêng ảnh, không phụ thuộc alignItems của cha
    width: "45%", // nhỏ hơn bản cũ (70%) để ScrollView mô tả bên dưới còn đủ chỗ cuộn
    aspectRatio: 3 / 4, // giữ tỉ lệ ảnh dù width theo %
    borderRadius: 12,
    backgroundColor: "#EEF2F7",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },
  author: {
    marginTop: 4,
    fontSize: 14,
    color: "#5B6B7F",
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#1E1B4B",
  },
  description: {
    marginTop: 16,
    fontSize: 14,
    lineHeight: 21,
    color: "#374151",
  },
  bottomBar: {
    flexDirection: "row", // giá bên trái, nút bên phải
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  bottomPrice: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1E1B4B",
  },
  addButton: {
    backgroundColor: "#4338CA",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
