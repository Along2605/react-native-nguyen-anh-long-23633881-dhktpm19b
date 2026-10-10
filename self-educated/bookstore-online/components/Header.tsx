import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export function Header(){
    return (
        <View style={styles.header}>
            
            <View style={styles.logoGroup}>
               <Ionicons name="book" size={22} color="white"></Ionicons>
                <Text style={styles.logo} >Book store</Text>
            </View>

            <View style={styles.iconGroup}>
                <Ionicons name="search-outline" size={22} color="white"></Ionicons>
                <Ionicons name="cart-outline" size={22} color="white"></Ionicons>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        height: 56,
        width: "100%",
        paddingHorizontal: 16,
        backgroundColor: "navy"
    },
    logoGroup: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    logo: {
        color: "white",
        fontSize: 17, fontWeight: "700"
    },
    iconGroup: {
        flexDirection: "row",
        gap: 16
    }
})
