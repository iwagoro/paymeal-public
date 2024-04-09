import { app } from "@/components/util/firebase";
import { collection, getDocs, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
const db = getFirestore(app);

export const getMenus = async () => {
    const colRef = collection(db, "menu");
    const docSnap = await getDocs(colRef);
    return docSnap.docs.map((doc) => doc.data());
};

export const getUserData = async (user: string) => {
    const docRef = doc(db, "user", user);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
};
