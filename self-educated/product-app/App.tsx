import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Platform, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ProductCard, { Product } from './components/ProductCard';


const API_URL = "https://6ac89efcfd7c536b1bd96394.mockapi.io/products";

 
export default function App() {
  const [products,setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(false);
const [error,setError] = useState<null | string>(null);
const [isTile,setIsTile] = useState(false);


const loadProduct = async () => {

  try {
    setLoading(true);
    setError(null);
    const res = await fetch(API_URL);
    if(!res.ok) throw new Error("HTTP : " + res.status);
    const data = await res.json();
    setProducts(data)
    
  } catch (e) {
    setError("Không tải được sản phẩm")
  }finally{
    setLoading(false)
  }

}

useEffect(() => {
  loadProduct();
},[])

const handleSelect = useCallback(
  (id: string) => {
    const p = products.find(x => x.id === id);
    if(!p) return;
    if(Platform.OS ==="web"){
      window.alert(p.name);
    }else{
      Alert.alert("Bạn đã chọn", p.name)
    }
  },[products]
)

const numColums = isTile? 2: 1;


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe}>
        <View  style={styles.header}>
          <Text style={{fontWeight: 500, fontStyle: "italic"}}>
            Dạng lưới
          </Text>
          <Switch value={isTile} onValueChange={setIsTile}/>
        </View>
    <View style={styles.container}>
      <Text style={styles.title}>Product App</Text>
      {loading ? (<ActivityIndicator size="large" color="blue"/>) :
       (<FlatList key={String(numColums)} numColumns={numColums} data={products} keyExtractor={(item) => item.id}
       renderItem={({item}) => <ProductCard product={item} layout={isTile ? "tile" : "row"} onSelect={handleSelect}/> }
       ListEmptyComponent={<Text>{error ?? "Không có sản phẩm "}</Text>}
       />)}
      <StatusBar style="auto" />
    </View>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "whitesmoke"
  },
  container: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
    item: {
    padding: 10,
    marginBottom: 8,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  header:{
    marginTop: 10,
    marginRight: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 3
  }
});
