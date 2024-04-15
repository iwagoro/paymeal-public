import { app } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc, updateDoc, getDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
const db = getFirestore(app);

export const getMenus = async () => {
    const colRef = collection(db, "menu");
    const docSnap = await getDocs(colRef);
    console.log(docSnap.docs);
    return [docSnap.docs.map((doc) => doc.id), docSnap.docs.map((doc) => doc.data())];
};

export const getRefDoc = async (ref: string) => {
    const docRef = doc(db, ref);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
};

export const addToBag = (user: string, item: string) => {
    const docRef = doc(db, "user", user);
    const itemRef = doc(db, "menu", item);
    updateDoc(docRef, {
        bag: arrayUnion(itemRef),
    });
};

export const deleteFromBag = (user: string, item: string) => {
    const docRef = doc(db, "user", user);
    const itemRef = doc(db, "menu", item);
    updateDoc(docRef, {
        bag: arrayRemove(itemRef),
    });
};

export const getUserData = async (user: string) => {
    const docRef = doc(db, "user", user);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
};

export const getUserBag = async (user: string) => {
    const docRef = doc(db, "user", user);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
};
