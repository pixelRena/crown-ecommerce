// import { useEffect } from 'react';
// import {  getRedirectResult } from 'firebase/auth';
import Button from "../../components/button/button.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import { 
    auth,
    signInWithGooglePopup, 
    signInWithGoogleRedirect, 
    createUserDocFromAuth } from "../../utils/firebase.utils";

const SignIn = () => {
    // Method to sign in with redirect instead of popup
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const res = await getRedirectResult(auth);
    //         if(res) {
    //             const userDocRef = await createUserDocFromAuth(res.user);
    //         }
    //     };
    //     fetchData();  
    // }, []);

    // calling to DB - async
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocFromAuth(user);
    };

    return(
        <div>
            <h1>Sign in screen</h1>
            <Button buttonType='google' onClick={logGoogleUser}>
                Sign In With Google Popup
            </Button>
            {/* <button onClick={signInWithGoogleRedirect}>
                Sign In With Google Redirect
            </button> */}
            <SignUpForm/>
        </div>
    )
}

export default SignIn;