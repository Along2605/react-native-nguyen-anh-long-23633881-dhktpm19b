import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Book } from '../data/data';

interface BookDetailScreenProps {
  book: Book;
  onBack: () => void;
  onAddToCart: () => void;
}

export function BookDetailScreen({ book, onBack, onAddToCart }: BookDetailScreenProps) {
  return (
    <View style={styles.screen}>
      {/* 1. Nút quay lại: cố định trên cùng */}
      <Pressable style={styles.backButton} onPress={onBack}>
        <Ionicons name="arrow-back" size={20} color="slateblue" />
        <Text style={styles.backText}>Quay lại</Text>
      </Pressable>

      {/* 2. Ảnh bìa lớn: NGOÀI ScrollView nên đứng yên */}
      <Image source={{ uri: book.cover }} style={styles.cover} />

      {/* 3. Phần chữ dài: ScrollView riêng, chiếm phần còn lại */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
        <Text style={styles.price}>{book.price.toLocaleString('vi-VN')} đ</Text>
        <Text style={styles.description}>{book.description}</Text>
      </ScrollView>

      {/* 4. Thanh dưới cùng: NGOÀI ScrollView nên luôn nằm ở đáy */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomPrice}>{book.price.toLocaleString('vi-VN')} đ</Text>
        <Pressable style={styles.addButton} onPress={onAddToCart}>
          <Ionicons name="cart-outline" size={18} color="white" />
          <Text style={styles.addButtonText}>Thêm vào giỏ</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: 'white' },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backText: { color: 'slateblue', fontWeight: '600' },
  cover: {
    alignSelf: 'center', // chỉ riêng ảnh được căn giữa theo chiều ngang
    width: '45%',
    aspectRatio: 3 / 4,
    borderRadius: 12,
    backgroundColor: 'gainsboro',
    marginBottom: 16,
  },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 24 },
  title: { fontSize: 20, fontWeight: '800', color: 'black' },
  author: { marginTop: 4, fontSize: 14, color: 'gray' },
  price: { marginTop: 10, fontSize: 18, fontWeight: '700', color: 'red' },
  description: { marginTop: 16, fontSize: 14, lineHeight: 21, color: 'dimgray' },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between', // giá bên trái, nút bên phải
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: 'gainsboro',
    backgroundColor: 'white',
  },
  bottomPrice: { fontSize: 17, fontWeight: '800', color: 'red' },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'slateblue',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
  },
  addButtonText: { color: 'white', fontWeight: '700' },
});