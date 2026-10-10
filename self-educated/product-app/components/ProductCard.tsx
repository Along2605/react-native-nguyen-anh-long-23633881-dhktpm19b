import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type Product = {
  id: string,
  name: string,
  category: string,
  price: number;
  rating: number;
  image: string;
  inStock: boolean
}

export type ProductCardProps = {
    product: Product;
    layout? : "row" | "tile";
    onSelect: (id: string) => void;
}

function ProductCard({product, layout, onSelect}: ProductCardProps){
    const isTile = layout === "tile";
    return(
        <TouchableOpacity style = {[styles.card, isTile && styles.cardTile]} onPress={() => onSelect(product.id)} >
            <View>
                <Image style = {isTile ? styles.imageTile : styles.image} source={{uri: product.image}}/>
                  {isTile &&  <Text style={styles.badge}>{`⭐ ${product.rating.toFixed(1)}`}</Text> }
            </View>
             
            <View  style = {styles.info} >
               
                <Text  style = {styles.name} >{product.name}</Text>
               {!isTile && <Text>{product.category}</Text>} 
               {!isTile && <Text>{product.price.toLocaleString("vi-VN")}đ</Text>} 
               {!isTile &&  <Text>{`⭐ ${product.rating.toFixed(1)}`}</Text> }
               
            <Text>{product.inStock ? "Còn hàng" :  "Hết hàng"}</Text>
            </View>
        </TouchableOpacity>
    )}

    export default React.memo(ProductCard);

    const styles = StyleSheet.create({
        card: {
            flexDirection: "row",
            gap: 12,
            padding: 10,
            marginBottom: 12,
            backgroundColor: "white",
            borderRadius: 10
        },
        cardTile: {
            flexDirection: "column",
            width: "48%",
            alignSelf: "center"
        },
        badge: {
            position: "absolute",
            top: 6,
            left: 6,
            borderRadius: 12
        },
        imageTile: {
            width: "100%",
            aspectRatio: 2/3
        },
        image: {
            width: 70,
            height: 100,
            borderRadius: 6,
            backgroundColor: "gainsboro"
        }
        ,
        info: {
            flexShrink: 1,
            gap: 4
        },
        name: {
            fontWeight: "bold"
        }
    })
    
