import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";
import MarkFav from "../MarkFav";

export default function PetListItem({ pet }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/pet-details",
          params: pet,
        })
      }
      style={{
        height:200,
        width:155,
        padding: 10,
        marginRight: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
      }}
    >
      <View style={{ position: "absolute", zIndex: 10, right: 10, top: 10 }}>
        <MarkFav pet={pet} color="white" />
      </View>
      <Image
        source={{ uri: pet?.imageUrl }}
        style={{
          width: 135,
          height: 135,
          objectFit: "cover",
          borderRadius: 10,
        }}
      />
      {/* Pet name */}
      <Text style={{ fontFamily: "outfit-medium", fontSize: 18 }}>
        {pet.name}
      </Text>
      {/* Breed + age*/}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: Colors.GRAY, fontFamily: "outfit" }}>
          {pet?.breed}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            color: Colors.PRIMARY,
            paddingHorizontal: 6,
            borderRadius: 10,
            backgroundColor: Colors.LIGHT_PRIMARY,
            fontSize: 11,
          }}
        >
          {pet.age} Yrs
        </Text>
      </View>
    </TouchableOpacity>
  );
}
