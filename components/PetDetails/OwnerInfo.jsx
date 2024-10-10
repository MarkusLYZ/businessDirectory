import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function OwnerInfo({ pet }) {
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: pet?.userImage }}
          style={{ width: 50, height: 50, borderRadius: 99 }}
        ></Image>
        <View>
          <Text style={{ fontFamily: "outfit-medium", fontSize: 16 }}>
            {pet?.username}
          </Text>

          <Text style={{ fontFamily: "outfit", color: Colors.GRAY }}>
            Pet Owner
          </Text>
        </View>
        <Ionicons name="send" size={24} color={Colors.GRAY} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    borderWidth: 1,
    borderRadius: 15,
    borderColor:Colors.GRAY,
    backgroundColor: Colors.WHITE,
    justifyContent: "space-between",
  },
});
