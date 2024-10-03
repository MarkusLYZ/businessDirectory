import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./../../config/FirebaseConfig";
import Colors from "../../constants/Colors";

export default function Category() {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
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
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
        Category
      </Text>
      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({ item, index }) => (
          <View style={{ flex: 1 }}>
            <View style={styles.container}>
              <Image
                source={{ uri: item?.imageUrl }}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <Text style={{ textAlign: "center", fontFamily: "outfit" }}>
              {item?.name}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.LIGHT_PRIMARY,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.PRIMARY,
    margin: 5,
  },
});
