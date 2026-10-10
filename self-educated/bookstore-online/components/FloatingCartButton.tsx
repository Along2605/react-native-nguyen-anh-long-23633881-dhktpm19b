import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface FloatingCartButtonProps{
    count: number;
    onPress: () => void;
}

export function FloatingCartButton({count, onPress}: FloatingCartButtonProps){
        return(
        <Pressable style={styles.button} onPress={onPress}>
            <Ionicons name="cart" size={26} color="white" />   

            {count > 0 && (                                   
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{count}</Text>
                </View>
            )}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        right: 20,
        bottom: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "slateblue",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0px 4px 8px gray"
    },
    badge: {
        position: "absolute",
        top: -4,
        right: -4,
      
        minWidth: 20,
        height: 20,
        borderRadius: 10,
        paddingHorizontal: 4,
        backgroundColor: "crimson",
        alignItems: "center",
        justifyContent: "center"
    },
    badgeText: {
        color: "white",
        fontSize: 11,
        fontWeight: "700"
    }
})