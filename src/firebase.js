import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut
} from "firebase/auth";

import { getFirestore, addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

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

////////////////////////////////////////////////////////////
// SIGNUP
////////////////////////////////////////////////////////////
export const signup = async (name, email, password) => {
  if (!name || !email || !password) {
    toast.error("Fill all fields");
    return;
  }

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await addDoc(collection(db, "users"), {
      uid: res.user.uid,
      name,
      email
    });

    toast.success("Account created");
  } catch (error) {
    toast.error(error.message);
  }
};

////////////////////////////////////////////////////////////
// LOGIN
////////////////////////////////////////////////////////////
export const login = async (email, password) => {
  if (!email || !password) {
    toast.error("Enter email & password");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login successful");
  } catch {
    toast.error("Wrong email or password");
  }
};

////////////////////////////////////////////////////////////
// RESET PASSWORD (REAL EMAIL TO GMAIL)
////////////////////////////////////////////////////////////
export const resetPassword = async (email) => {
  if (!email) {
    toast.error("Enter email first");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    toast.success("Reset email sent to Gmail 📩");
  } catch {
    toast.error("Email not found");
  }
};

////////////////////////////////////////////////////////////
// MAGIC LINK LOGIN (EMAIL LINK LOGIN)
////////////////////////////////////////////////////////////
export const sendMagicLink = async (email) => {
  const actionCodeSettings = {
    url: "http://localhost:5173",
    handleCodeInApp: true
  };

  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    localStorage.setItem("emailForSignIn", email);
    toast.success("Login link sent to Gmail 📩");
  } catch (e) {
    toast.error(e.message);
  }
};

export const completeMagicLogin = async () => {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = localStorage.getItem("emailForSignIn");
    if (!email) email = prompt("Enter email");

    await signInWithEmailLink(auth, email, window.location.href);
    toast.success("Logged in with email link");
  }
};

////////////////////////////////////////////////////////////222222222222222222222++++++++++++++++++++++++++++++++++
export const logout = () => signOut(auth);
