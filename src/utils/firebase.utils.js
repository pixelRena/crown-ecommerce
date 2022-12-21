import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider } from 'firebase/auth';

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
