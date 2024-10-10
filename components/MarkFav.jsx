import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Shared from "./../Shared/Shared";
import { useUser } from "@clerk/clerk-expo";

export default function MarkFav({ pet, color='black' }) {
  const { user } = useUser();
  const [favList, setFavList] = useState([]);
  useEffect(() => {
    user && GetFav();
  }, [user]);
  const GetFav = async () => {
    const result = await Shared.GetFavList(user);
    setFavList(result?.favorites ? result?.favorites : []);
  };
  const AddToFav = async () => {
    if (pet?.id) {
      // Ensure pet.id is valid
      const favResult = [...favList];

      if (!favResult.includes(pet.id)) {
        favResult.push(pet.id); // Only push valid IDs
        console.log(favResult); // Log updated favorites list
        await Shared.UpdateFav(user, favResult);
        GetFav(); // Refresh favorites list
      }
    } else {
      console.error("Pet ID is undefined, cannot add to favorites.");
    }
  };
  const removeFromFav = async () => {
    const favResult = favList.filter((item) => item != pet.id);
    await Shared.UpdateFav(user, favResult);
    GetFav();
  };
  return (
    <View>
      {favList?.includes(pet.id) ? (
        <Pressable onPress={removeFromFav}>
          <Ionicons name="heart" size={30} color="red" />
        </Pressable>
      ) : (
        <Pressable onPress={AddToFav}>
          <Ionicons name="heart-outline" size={30} color={color} />
        </Pressable>
      )}
    </View>
  );
}
