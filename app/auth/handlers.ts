import { createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser } from "firebase/auth";
import { apiRequest } from "@/lib/apiHandler";
import { auth } from "@/lib/firebase";

//! サインアップ時のエラーハンドリング
export const handleSignUpError = (error: any) => {
    switch (error.code) {
        case "auth/email-already-in-use":
            return "This email is already in use";
            break;
        case "auth/invalid-email":
            return "Invalid email address";
            break;
        case "auth/operation-not-allowed":
            return "Operation not allowed";
            break;
        case "auth/weak-password":
            return "Weak password";
            break;
        default:
            return "Unknown error occurred";
            break;
    }
};

//!ログイン時のエラーハンドリング
export const handleLoginError = (error: any) => {
    switch (error.code) {
        case "auth/invalid-email":
            return "Invalid email address";
            break;
        case "auth/user-disabled":
            return "User disabled";
            break;
        case "auth/user-not-found":
            return "User not found";
            break;
        case "auth/wrong-password":
            return "Wrong password";
            break;
        default:
            return "Unknown error occurred";
            break;
    }
};

export type FormType = { email: string; password: string };
//! サインアップハンドラ
export const SignUpHandler = async (data: FormType, setErrorMessage: (msg: string) => void) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const token = await userCredential.user.getIdToken();
        try {
            await apiRequest({
                method: "POST",
                endpoint: "/api/user",
                token: token,
            });
            window.location.href = "/home";
        } catch (error) {
            await deleteUser(userCredential.user);
            setErrorMessage("Server error occurred. Please try again later.");
        }
    } catch (error) {
        const msg = handleSignUpError(error);
        setErrorMessage(msg);
    }
};

//! ログインハンドラ
export const LoginHandler = async (data: FormType, setErrorMessage: (msg: string) => void) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
        const token = await userCredential.user.getIdToken();
        try {
            await apiRequest({
                method: "GET",
                endpoint: "/api/user",
                token: token,
            });
            window.location.href = "/home";
        } catch {
            setErrorMessage("Server error occurred. Please try again later.");
        }
    } catch (error) {
        const msg = handleLoginError(error);
        setErrorMessage(msg);
    }
};
