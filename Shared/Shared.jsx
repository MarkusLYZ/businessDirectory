import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./../config/FirebaseConfig";
const GetFavList = async (user) => {
  const docSnap = await getDoc(
    doc(db, "UserFavPet", user?.primaryEmailAddress?.emailAddress)
  );
  if (docSnap?.exists()) {
    return docSnap.data();
  } else {
    await setDoc(
      doc(db, "UserFavPet", user?.primaryEmailAddress?.emailAddress),
      { email: user?.primaryEmailAddress?.emailAddress, favorites: [] }
    );
  }
};
const UpdateFav = async (user, favorites) => {
  const docRef = doc(db, "UserFavPet", user?.primaryEmailAddress?.emailAddress);
  const validFavorites = favorites.filter(Boolean);
  try {
    await updateDoc(docRef, {
      favorites: validFavorites,
    });
  } catch (error) {
    console.error("Error updating favorites:", error);
  }
};
export default {
  GetFavList,
  UpdateFav,
};
