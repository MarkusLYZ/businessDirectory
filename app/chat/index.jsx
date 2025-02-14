import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { GiftedChat } from "react-native-gifted-chat";
import moment from "moment";

export default function ChatScreen() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  let otherUser = [];
  useEffect(() => {
    GetUserDetails();
    const unsubscribe = onSnapshot(
      collection(db, "Chat", params?.id, "Messages"),
      (snapshot) => {
        const messageData = snapshot.docs.map((doc) => ({
          _id: doc.id,
          ...doc.data(),
        }));
        setMessages(messageData);
      }
    );
    return () => unsubscribe();
  }, []);
  const GetUserDetails = async () => {
    const docRef = doc(db, "Chat", params?.id);
    const docSnap = await getDoc(docRef);
    const result = docSnap.data();
    if (Array.isArray(result?.users)) {
      otherUser = result.users.filter(
        (item) => item.email != user?.primaryEmailAddress?.emailAddress
      );
    } else {
      console.error("'users' field is either undefined or not an array");
    }
    navigation.setOptions({
      headerTitle: otherUser[0].name,
    });
  };
  const onSend = async (newMessage) => {
    setMessages((previousMessage) =>
      GiftedChat.append(previousMessage, newMessage)
    );
    newMessage[0].createdAt = moment().utc().format();;
    await addDoc(collection(db, "Chat", params.id, "Messages"), newMessage[0]);
  };
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      showUserAvatar
      user={{
        _id: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName,
        avatar: user?.imageUrl,
      }}
    />
  );
}
