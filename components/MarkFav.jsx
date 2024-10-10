import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Shared from "./../Shared/Shared";
import { useUser } from "@clerk/clerk-expo";

export default function MarkFav() {
  const { user } = useUser();
  const [favList, setFavList] = useState();
  useEffect(() => {
    user && GetFav();
  }, [user]);
  const GetFav = async () => {
    const result = await Shared.GetFavList(user);
    console.log(result);
  };
  return (
    <Pressable>
      <Ionicons name="heart-outline" size={30} color="black" />
    </Pressable>
  );
}
