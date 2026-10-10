import { View,ScrollView, Text, StyleSheet } from "react-native";
import { Header } from "../components/Header";
import { CategoryChips } from "../components/CategoryChips";
import { BookGrid } from "../components/BookGrid";
import { BOOKS } from "../data/data";
import { FloatingCartButton } from "../components/FloatingCartButton";
import { Ionicons } from "@expo/vector-icons";

interface HomeScreenProps{
    cartCount: number;
    onPressBook: (id: number) => void;
    onPressCart: () => void;
}

export function HomeScreen({cartCount, onPressBook, onPressCart} : HomeScreenProps){
    return(
        <View style={styles.screen}>
            <Header />
            <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>Danh mục</Text>
                <CategoryChips/>
                 <Text style={styles.sectionTitle}>Sách nổi bật <Ionicons name="star" color="yellow"/> </Text>
                 <BookGrid books={BOOKS} onPressBook={onPressBook}/>
            </ScrollView>
            <FloatingCartButton count={cartCount} onPress={onPressCart}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        backgroundColor: "whitesmoke"
    },
    
    scroll: {
        flex: 1
    },
    floatingCart: {
        position: "absolute",
        bottom: 15,
        right: 10
    },
    content: {
        padding: 16,
        paddingBottom: 100
    },
    sectionTitle:{
        fontWeight: 700,
        color: "black"
    }
})