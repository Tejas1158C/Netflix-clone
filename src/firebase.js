import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove
} from "firebase/firestore";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";

////////////////////////////////////////////////////
const firebaseConfig = {
  apiKey: "AIzaSyAfX52-wASO2WAZBMsjijuH4-RK75H3QPo",
  authDomain: "netflix-clone-5e585.firebaseapp.com",
  projectId: "netflix-clone-5e585",
  storageBucket: "netflix-clone-5e585.firebasestorage.app",
  messagingSenderId: "497992933218",
  appId: "1:497992933218:web:58df106bd667ec8582963b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

////////////////////////////////////////////////////
// SIGNUP
////////////////////////////////////////////////////
export const signup = async (name, email, password) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);

  await addDoc(collection(db, "users"), {
    uid: res.user.uid,
    name,
    email,
    phone: "",
    avatar: "",
    myList: []
  });
};

////////////////////////////////////////////////////
// LOGIN
////////////////////////////////////////////////////
export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

////////////////////////////////////////////////////
// LOGOUT
////////////////////////////////////////////////////
export const logout = () => signOut(auth);

////////////////////////////////////////////////////
// RESET PASSWORD
////////////////////////////////////////////////////
export const resetPassword = async (email) => {
  if (!email) {
    alert("Enter email first");
    return;
  }

  await sendPasswordResetEmail(auth, email);
  alert("Password reset email sent");
};

////////////////////////////////////////////////////
// GET PROFILE
////////////////////////////////////////////////////
export const getProfile = async () => {
  const user = auth.currentUser;
  if (!user) return null;

  const q = query(collection(db, "users"), where("uid", "==", user.uid));
  const snap = await getDocs(q);

  if (snap.empty) return null;

  const d = snap.docs[0];
  return { id: d.id, ...d.data() };
};

////////////////////////////////////////////////////
// ADD TO MY LIST
////////////////////////////////////////////////////
export const addToMyList = async (docId, movie) => {
  console.log("ADDING:", movie);

  const refDoc = doc(db, "users", docId);

  await updateDoc(refDoc, {
    myList: arrayUnion(movie)
  });

  console.log("ADDED SUCCESS");
};

////////////////////////////////////////////////////
// REMOVE FROM MY LIST
////////////////////////////////////////////////////
export const removeFromMyList = async (docId, movie) => {
  const refDoc = doc(db, "users", docId);

  await updateDoc(refDoc, {
    myList: arrayRemove(movie)
  });
};

////////////////////////////////////////////////////
// UPDATE PROFILE
////////////////////////////////////////////////////
export const updateProfileData = async (docId, data) => {
  const refDoc = doc(db, "users", docId);

  await updateDoc(refDoc, {
    name: data.name || "",
    email: data.email || "",
    phone: data.phone || "",
    avatar: data.avatar || ""
  });
};

////////////////////////////////////////////////////
// UPLOAD AVATAR
////////////////////////////////////////////////////
export const uploadAvatar = async (file, userId) => {
  const storageRef = ref(storage, `avatars/${userId}.png`);

  await uploadBytes(storageRef, file);

  const url = await getDownloadURL(storageRef);
  return url;
};
