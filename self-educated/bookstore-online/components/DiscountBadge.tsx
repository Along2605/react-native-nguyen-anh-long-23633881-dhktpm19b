import { StyleSheet, Text, View } from "react-native";

interface DiscountBadgeProps{
    discountPercent?: number;
    isNew?: boolean;
}

export function DiscountBadge({discountPercent,isNew} : DiscountBadgeProps){
    if(!discountPercent && ! isNew) return null;
    return (
        <View style={[styles.badge, isNew && styles.badgeNew]}>
            <Text style={styles.badgeText}>
                {isNew? 'Mới': `-${discountPercent}%`}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    badge: {
        position: "absolute",
        top: 6,
        left: 6,
        backgroundColor: "crimson",
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 3
    },
    badgeNew: {
        backgroundColor: "darkorange"
    },
    badgeText:{
        color: "white",
        fontSize: 11,
        fontWeight: 700
    }
})