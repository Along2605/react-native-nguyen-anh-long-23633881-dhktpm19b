import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Book } from "../data/data";
import { DiscountBadge } from "./DiscountBadge";

interface BookGripProps{
    books: Book[],
    onPressBook?: (id: number) => void;
}

export function BookGrid({books, onPressBook}: BookGripProps){
    return (
        <View style={styles.grid}>
            {books.map( (book) => (
            <Pressable key={book.id} style={styles.item} onPress={() => onPressBook?.(book.id)}>
               
                <View style={styles.coverWrap}>
                <Image source={{uri: book.cover}} style={styles.cover}/>    
                 <DiscountBadge discountPercent={book.discountPercent} isNew={book.isNew}/>
                </View>
                <Text style={styles.title}numberOfLines={2}>{book.title}</Text>
                <Text style={styles.price}>{book.price.toLocaleString("vi-VN")} đ</Text>
            </Pressable>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    item:{
        width: "30%",
        marginBottom: 10
    },
    coverWrap: {
        width: "100%",
        aspectRatio: 3/4,
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: "gainsboro"
    },
    cover: {width: "100%", height: "100%"},
    title: {marginTop: 6, fontSize: 13, fontWeight: "600", color: "black"},
    price: {marginTop: 2, fontSize: 13, fontWeight: 700, color: "red"}
})