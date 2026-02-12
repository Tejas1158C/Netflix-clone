import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { signOut } from "firebase/auth";
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
const auth = getAuth(app);
const db = getFirestore(app);

const signup =async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc (collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split("/")[1].split("-").join(" "));
    }
}

const login = async (email, password) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code);
    }
}

const logout = () => {
    signOut(auth);
}
export {auth, db, signup, login, logout};