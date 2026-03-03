import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, set, ref, remove, onValue } from "firebase/database";

// Firebases config object
const firebaseConfig = {
  apiKey: "AIzaSyDfyvg35N9CWWOHknPcYI0xNMb0_iLQixw",
  authDomain: "mcp-project-471a6.firebaseapp.com",
  projectId: "mcp-project-471a6",
  storageBucket: "mcp-project-471a6.firebasestorage.app",
  messagingSenderId: "411328707843",
  appId: "1:411328707843:web:1239c7cac46542ce81fd36",
  measurementId: "G-79RN0TLV53",
  databaseURL: "https://mcp-project-471a6-default-rtdb.firebaseio.com",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getDatabase(app);

export const signUpUser = async (
  username: string,
  email: string,
  password: string,
): Promise<void> => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await updateProfile(user, { displayName: username });
  } catch (error) {
    console.error("Sign-up error:", error);
    throw error;
  }
};

export const logInUser = async (
  email: string,
  password: string,
): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Log-in error:", error);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign-out error:", error);
    throw error;
  }
};

export const savedLikedPost = (userId: string, postId: string) => {
  set(ref(db, "users/" + userId + "/likedPosts/" + postId), true);
};
export const removeLikedPost = (userId: string, postId: string) => {
  remove(ref(db, "users/" + userId + "/likedPosts/" + postId));
};

export const getLikedPosts = (userId: string, setCallBack: any) => {
  const likedPostsRef = ref(db, "users/" + userId + "/likedPosts");
  const unsub = onValue(likedPostsRef, (snapshot) => {
    setCallBack(Object.keys(snapshot.val() || {}));
  });
  return unsub;
};
