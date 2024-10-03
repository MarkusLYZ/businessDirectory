import { View, Text, Alert } from "react-native";
import React, { useEffect } from "react";
import { BackHandler } from "react-native";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import PetListByCategory from "../../components/Home/PetListByCategory";
import { useFocusEffect,useNavigation } from "@react-navigation/native";

export default function home() {
  const navigation = useNavigation();
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (navigation.canGoBack()) {
          console.log('going back')
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
    <View style={{ padding: 20, marginTop: 20 }}>
      <Header />
      <Slider />
      <PetListByCategory />
    </View>
  );
}
