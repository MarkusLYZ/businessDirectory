import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useAuth, useUser } from "@clerk/clerk-expo";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Profile() {
  const Menu = [
    {
      id: 1,
      name: "Add New Pet",
      icon: "add-circle",
      path: "/add-new-pet",
    },
    {
      id: 5,
      name: "My Posts",
      icon: "bookmark",
      path: "/user-post",
    },
    {
      id: 2,
      name: "Favorites",
      icon: "heart",
      path: "/(tabs)/favorite",
    },
    {
      id: 3,
      name: "Inbox",
      icon: "chatbubble",
      path: "/(tabs)/inbox",
    },
    {
      id: 4,
      name: "Logout",
      icon: "exit",
      path: "logout",
    },
  ];
  const { user } = useUser();
  const router = useRouter();
  const { signOut } = useAuth();
  const onPressMenu = (menu) => {
    if (menu == "logout") {
      signOut();
      return;
    }
    router.push(menu.path);
  };
  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 30 }}>Profile</Text>
      <View
        style={{ display: "flex", alignItems: "center", marginVertical: 15 }}
      >
        <Image
          source={{ uri: user?.imageUrl }}
          style={{ width: 80, height: 80, borderRadius: 99 }}
        />
        <Text style={{ fontFamily: "outfit-bold", fontSize: 20, marginTop: 6 }}>
          {user?.fullName}
        </Text>
        <Text
          style={{ fontFamily: "outfit", fontSize: 16, color: Colors.GRAY }}
        >
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>
      <FlatList
        data={Menu}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onPressMenu(item)}
            key={item.id}
            style={{
              marginVertical: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              backgroundColor: Colors.WHITE,
              padding: 5,
              borderRadius: 10,
            }}
          >
            <Ionicons
              name={item?.icon}
              style={{
                padding: 15,
                backgroundColor: Colors.LIGHT_PRIMARY,
                borderRadius: 8,
              }}
              size={24}
              color={Colors.PRIMARY}
            />
            <Text style={{ fontFamily: "outfit", fontSize: 20 }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
