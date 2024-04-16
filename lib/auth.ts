"use client";
import { getAuth } from "firebase/auth";
import { app } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { toast } from "sonner";

const auth = getAuth(app);
const db = getFirestore(app);

export const createUserDoc = (user: any) => {
    const docRef = doc(db, "user", user);
    setDoc(docRef, {
        email: user,
        orders: [],
        chats: [],
        bag: [],
    });
};

export const createUser = async (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential: any) => {
            window.location.href = "/home";
            createUserDoc(email);
            toast("Success", { description: "You have successfully created an account" });
        })
        .catch((error: any) => {
            console.log(error);
            toast("Opps!", { description: "An error occured" });
        });
};

export const loginUser = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential: any) => {
            window.location.href = "/home";
            toast("Success", { description: "You have successfully created an account" });
        })
        .catch((error: any) => {
            toast("Opps!", { description: "An error occured" });
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
