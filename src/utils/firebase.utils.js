import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signOut,
    signInWithEmailAndPassword,
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged } from 'firebase/auth';
import { 
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC6gq32j4_bNQVlcThKy0BcniVczt0ha4c",
    authDomain: "crwn-clothing-86b8c.firebaseapp.com",
    projectId: "crwn-clothing-86b8c",
    storageBucket: "crwn-clothing-86b8c.appspot.com",
    messagingSenderId: "421016635239",
    appId: "1:421016635239:web:876dc414efd19a7cc051c2"
};
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: "select_account"});

// * Helper Functions

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    // * Creates & References the collection e.g "categories" from collectionKey
    const collectionRef = collection(db, collectionKey);

    // * Batch: Allows attachment of RWD's to the batch and when ready to execute, the batch begins after the SET's
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        // * Set the document inside of the collection "categories"
        const docRef = doc(collectionRef, object.title.toLowerCase());
        // * Give the document the object (items, {id,image,name,price})
        batch.set(docRef, object);
    });

    await batch.commit();
};

export const getCategoriesAndDocuments = async (collectionKey) => {
    const collectionRef = collection(db, collectionKey);
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        // * Get all category documents and set their objects as needed
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});

    return categoryMap;
};

export const createUserDocFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;

    const userDocRef = doc(db, "users", userAuth.uid);

    // the instance/data inside of document reference
    const userSnapshot = await getDoc(userDocRef);

    // Check if user data does not exists & create document for data in collection using snapshot
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log("Error creating user", error.message);
        }
    }
    // Check if user data exists & return
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    // Use await to return what we will receive back
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async() => signOut(auth);

export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback);
};
