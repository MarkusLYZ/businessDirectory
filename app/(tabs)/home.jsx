import { View, Text, Alert, ScrollView, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { BackHandler } from "react-native";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import Colors from "../../constants/Colors";
import PetListByCategory from "../../components/Home/PetListByCategory";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function home() {
  const navigation = useNavigation();
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (navigation.canGoBack()) {
          console.log("going back");
          navigation.goBack(); // Navigate back to the previous screen
        } else {
          Alert.alert("Exit App", "Are you sure you want to exit the app?", [
            { text: "Cancel", style: "cancel" },
            { text: "OK", onPress: () => BackHandler.exitApp() },
          ]);
        }
        return true; // Prevent default behavior (exit app)
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [navigation])
  );

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={{ padding: 20, marginTop: 20 }}>
        <Header />
        <Slider />
        <PetListByCategory />
        <TouchableOpacity style={styles.addNewPetContainer}>
          <MaterialIcons name="pets" size={24} color="black" />
          <Text
            style={{
              fontFamily: "outfit-medium",
              color: Colors.PRIMARY,
              fontSize: 18,
            }}
          >
            Add New Pet
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  addNewPetContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 20,
    marginTop: 20,
    backgroundColor: Colors.LIGHT_PRIMARY,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderStyle: "dashed",
    justifyContent: "center",
  },
});
