import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import Colors from "../../constants/Colors";

export default function AddNewPet() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Pet",
    });
  }, []);
  const handleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
  };
  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
        Add New Pet for Adoption
      </Text>
      <View
        style={{
          width: 90,
          height: 90,
          padding: 15,
          borderRadius: 15,
          borderWidth: 2,
          borderColor: Colors.GRAY,
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 10,
        }}
      >
        <Image
          style={{
            width: "70%",
            height: "70%",
            borderRadius: 15,
          }}
          source={require("./../../assets/images/placeholder.jpg")}
        />
      </View>
      {/* Pet Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Name *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("name", value)}
        />
      </View>
      {/* Breed Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Breed *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("breed", value)}
        />
      </View>
      {/* Age Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("age", value)}
        />
      </View>
      {/* Weight Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("weight", value)}
        />
      </View>
      {/* Address Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("address", value)}
        />
      </View>
      {/* About Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>About *</Text>
        <TextInput
          style={styles.input}
          numberOfLines={5}
          multiline
          onChangeText={(value) => handleInputChange("about", value)}
        />
      </View>
      {/* Submit Button */}
      <TouchableOpacity style={styles.button}>
        <Text
          style={{
            fontFamily: "outfit-medium",
            textAlign: "center",
            fontSize: 20,
          }}
        >
          Submit
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
  },
  input: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 7,
    fontFamily: "outfit",
  },
  label: {
    marginVertical: 5,
    fontFamily: "outfit",
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 7,
    fontFamily: "outfit",
    marginVertical: 10,
    marginBottom: 30,
  },
});
