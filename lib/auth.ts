import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, getIdToken, signInWithEmailAndPassword } from "firebase/auth";
import { addUser } from "./appUtils";

//* エラーハンドリング関数
const handleAuthError = (error: any) => {
    switch (error.code) {
        case "auth/email-already-in-use":
            alert("このメールアドレスは既に使用されています。");
            break;
        case "auth/invalid-email":
            alert("無効なメールアドレスです。");
            break;
        case "auth/operation-not-allowed":
            alert("メール/パスワードアカウントが有効になっていません。");
            break;
        case "auth/weak-password":
            alert("パスワードが弱すぎます。");
            break;
        default:
            alert("不明なエラーが発生しました。もう一度お試しください。");
            break;
    }
};

//! ユーザーの登録
export const registerUser = async (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential: any) => {
            const token = await getIdToken(userCredential.user);
            const status = await addUser(token);
            if (status) {
                window.location.href = "/home";
            } else {
                alert("アカウントを作成する際にエラーが発生しました");
            }
        })
        .catch((error: any) => handleAuthError(error));
};

//! ユーザーのログイン
export const loginUser = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential: any) => {
            window.location.href = "/home";
        })
        .catch((error: any) => {
            alert("ログインの際にエラーが発生しました");
        });
};

//! ユーザーのログアウト
export const logOut = async () => {
    auth.signOut()
        .then(() => {
            alert("ログアウトに成功しました");
        })
        .catch((error) => {
            alert("error logging out");
        });
};
