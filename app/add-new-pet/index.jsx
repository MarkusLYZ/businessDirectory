import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import Colors from "../../constants/Colors";
import { Picker } from "@react-native-picker/picker";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../config/FirebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { useUser } from "@clerk/clerk-expo";

export default function AddNewPet() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({ category: "Dogs", sex: "Male" });
  const [gender, setGender] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Dogs");
  const [image, setImage] = useState();
  const [loader, setLoader] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Pet",
    });
    GetCategories();
  }, []);
  const GetCategories = async () => {
    try {
      setCategoryList([]);
      const snapshot = await getDocs(collection(db, "Category"));
      snapshot.forEach((doc) => {
        //   console.log(doc.data());
        setCategoryList((categoryList) => [...categoryList, doc.data()]);
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const handleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };
  const onSubmit = () => {
    if (Object.keys(formData).length != 8) {
      ToastAndroid.show("Enter All Details", ToastAndroid.SHORT);
      return;
    }
    setLoader(true);
    UploadImage();
  };
  // Function to upload to Firebase Stroage
  const UploadImage = async () => {
    const resp = await fetch(image);
    const blobImage = await resp.blob();
    const storageRef = ref(storage, "/petAdopt/" + Date.now() + ".jpg");
    uploadBytes(storageRef, blobImage)
      .then((snapshot) => {
        console.log("File Uploaded");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          SaveFormData(downloadUrl);
        });
      });
  };
  const SaveFormData = async (imageUrl) => {
    const docId = Date.now().toString();
    await setDoc(doc(db, "Pets", docId), {
      ...formData,
      imageUrl: imageUrl,
      username: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
      userImage: user?.imageUrl,
      id: docId,
    });
    setLoader(false);
    router.replace("/(tabs)/home");
  };
  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
        Add New Pet for Adoption
      </Text>
      <Pressable onPress={imagePicker}>
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
          {!image ? (
            <Image
              style={{
                width: "70%",
                height: "70%",
                borderRadius: 15,
              }}
              source={require("./../../assets/images/placeholder.jpg")}
            />
          ) : (
            <Image
              style={{
                width: "120%",
                height: "120%",
                borderRadius: 15,
              }}
              source={{ uri: image }}
            />
          )}
        </View>
      </Pressable>
      {/* Pet Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Name *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("name", value)}
        />
      </View>
      {/* Category Input */}
      <View>
        <Text style={styles.label}>Pet Category *</Text>
        <Picker
          style={styles.input}
          selectedValue={selectedCategory}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedCategory(itemValue),
              handleInputChange("category", itemValue);
          }}
        >
          {categoryList.map((category, index) => (
            <Picker.Item
              key={index}
              label={category.name}
              value={category.name}
            />
          ))}
        </Picker>
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
          keyboardType="number-pad"
          onChangeText={(value) => handleInputChange("age", value)}
        />
      </View>
      {/* Gender Picker */}
      <View>
        <Text style={styles.label}>Gender *</Text>
        <Picker
          style={styles.input}
          selectedValue={gender}
          onValueChange={(itemValue, itemIndex) => {
            setGender(itemValue), handleInputChange("sex", itemValue);
          }}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>
      {/* Weight Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight *</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
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
      <TouchableOpacity
        onPress={onSubmit}
        style={styles.button}
        disabled={loader}
      >
        {loader ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <Text
            style={{
              fontFamily: "outfit-medium",
              textAlign: "center",
              fontSize: 20,
            }}
          >
            Submit
          </Text>
        )}
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
