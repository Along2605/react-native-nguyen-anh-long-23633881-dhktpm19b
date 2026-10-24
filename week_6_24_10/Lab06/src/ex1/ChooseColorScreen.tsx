import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { COLOR_ORDER, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { ColorKey, Phone } from "../types";
import type { SelectPhoneParamList } from "./SelectPhoneApp";

type Props = NativeStackScreenProps<SelectPhoneParamList, "ChooseColor"> & { phone: Phone };

export function ChooseColorScreen({ navigation, route, phone }: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(route.params?.color);
  const [line1, line2] = phone.name.split(" - "); // "Điện Thoại Vsmart Joy 3" / "Hàng chính hãng"

  return (
    <SafeAreaView style={styles.root} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <Image
          source={PHONE_COLORS[picked ?? phone.defaultColor].image}
          style={styles.thumb}
          resizeMode="contain"
        />
        <View style={styles.headerText}>
          <Text style={styles.small}>{line1}</Text>
          <Text style={styles.small}>{line2}</Text>
          {/* TODO 3: chỉ hiện khi đã chọn màu */}
          {picked && (
            <>
              <Text style={styles.small}>
                Màu: <Text style={styles.bold}>{PHONE_COLORS[picked].label}</Text>
              </Text>
              <Text style={styles.small}>
                Cung cấp bởi <Text style={styles.bold}>{phone.supplier}</Text>
              </Text>
              <Text style={styles.price}>{formatPrice(phone.price)}</Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>
        <View style={styles.swatches}>
          {COLOR_ORDER.map((key) => (
            <Pressable
              key={key}
              onPress={() => setPicked(key)}
              style={[
                styles.swatch,
                { backgroundColor: PHONE_COLORS[key].hex },
                picked === key && styles.swatchOn,
              ]}
            />
          ))}
        </View>

        {/* TODO 4: nút XONG → quay về Product, gửi màu đã chọn */}
        <Pressable
          style={styles.doneBtn}
          onPress={() =>
            // pop: true → lùi về màn Product cũ (React Navigation 7 không tự lùi nếu thiếu)
            navigation.navigate("Product", { color: picked }, { merge: true, pop: true })
          }>
          <Text style={styles.doneText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", gap: 12, padding: 12, backgroundColor: "#fff" },
  thumb: { width: 110, height: 130 },
  headerText: { flex: 1, gap: 4, justifyContent: "center" },
  small: { fontSize: 15, color: colors.text },
  bold: { fontWeight: "bold" },
  price: { fontSize: 15, fontWeight: "bold", color: colors.text },
  body: { flex: 1, backgroundColor: colors.grey, padding: 16 },
  hint: { fontSize: 18, color: colors.text },
  swatches: { flex: 1, alignItems: "center", justifyContent: "space-evenly", paddingVertical: 8 },
  swatch: { width: 85, height: 80 },
  swatchOn: { borderWidth: 4, borderColor: colors.navy },
  doneBtn: {
    height: 44, backgroundColor: colors.blue, borderRadius: 4,
    alignItems: "center", justifyContent: "center", marginBottom: 8,
  },
  doneText: { color: "white", fontWeight: "bold", fontSize: 18 },
});
