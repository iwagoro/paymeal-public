import { getAuth } from "firebase/auth";
import { app } from "@/components/util/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(app);
export const createUser = async (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential: any) => {
            // Signed in
            const user = userCredential.user;
            console.log("user", user);
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

export const signIn = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential: any) => {
            // Signed in
            const user = userCredential.user;
            console.log("user", user);
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
