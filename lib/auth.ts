import { getAuth } from "firebase/auth";
import { app } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { toast } from "sonner";

const auth = getAuth(app);
const db = getFirestore(app);

const createUserDoc = (user: any) => {
    const docRef = doc(db, "user", user.email);
    setDoc(docRef, {
        email: user.email,
        orders: [],
        chats: [],
        bag: [],
    });
};

export const createUser = async (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential: any) => {
            // Signed in
            const user = userCredential.user;
            createUserDoc(user);
            console.log("user", user);

            return user;
        })
        .catch((error: any) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            return "";
        });
};

export const signIn = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential: any) => {
            // Signed in
            const user = userCredential.user;
            // ...
            return user;
        })
        .catch((error: any) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            return "";
        });
};

export const logOut = async () => {
    auth.signOut()
        .then(() => {
            console.log("logged out ");
            toast("Logged out", { description: "success" });
        })
        .catch((error) => {
            console.log("error logging out");
            toast("Error logging out", { description: "error" });
        });
};
