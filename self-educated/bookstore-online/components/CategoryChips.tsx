import { StyleSheet, Text, View } from "react-native";
import { CATEGORIES } from "../data/data";

export function CategoryChips(){
    return (
        <View style = {styles.wrap}>
            {CATEGORIES.map(c => (
                <View style={styles.chip} key={c}>
                    <Text style={styles.chipText}>{c}</Text>
                </View>
            )
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8
    },
    chip: {
        padding: 10,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "slateblue"

    },
    chipText: {
        color: "darkslateblue"
    ,fontSize: 13,
    fontWeight: 600
    }
})