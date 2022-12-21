import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider } from 'firebase/auth';
import { 
    getFirestore,
    doc,
    getDoc,
    setDoc } from 'firebase/firestore';

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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt: "select_account"});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocFromAuth = async(userAuth) => {
    const userDocRef = doc(db, "users", userAuth.uid);
    console.log(userDocRef);

    // the instance/data inside of document reference
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    // Check if user data does not exists & create document for data in collection using snapshot
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log("Error creating user", error.message);
        }
    }
    // Check if user data exists & return
    return userDocRef;
};
