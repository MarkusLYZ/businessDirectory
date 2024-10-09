import { useUser } from "@clerk/clerk-expo";
import { Redirect, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function Index() {
  const { user } = useUser();
  // console.log(user);
  const rootNavigationState = useRootNavigationState();
  const CheckNavLoaded = () => {
    if (!rootNavigationState || !rootNavigationState.key) {
      return null; // Avoid accessing properties if rootNavigationState is undefined
    }
  };

  useEffect(() => {
    if (rootNavigationState) {
      CheckNavLoaded();
    }
  }, [rootNavigationState]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {user ? <Redirect href={"/(tabs)/home"} /> : <Redirect href={"/login"} />}
    </View>
  );
}
