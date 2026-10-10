import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import {BOOKS, CART_ITEMS, CATEGORIES} from './data/data'
import { Header } from './components/Header';
import { CategoryChips } from './components/CategoryChips';
import { BookGrid } from './components/BookGrid';
import { FloatingCartButton } from './components/FloatingCartButton';
import { useEffect, useState } from 'react';

import { HomeScreen } from './screens/HomeScreen';
import { BookDetailScreen } from './screens/BookDetailScreen';



export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
 
 const selectedBook = BOOKS.find( b => b.id === selectedId)
 return(
    <SafeAreaView  style={styles.root}>
      {selectedBook ? <BookDetailScreen book={selectedBook} onBack={() => setSelectedId(null)} onAddToCart={() => setCartCount(cartCount+1)}/> :
      <HomeScreen cartCount={cartCount} 
      onPressBook={(id) => {setSelectedId(id)} }
      onPressCart={() => setCartCount(0)}/>
}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white"
  }
});
