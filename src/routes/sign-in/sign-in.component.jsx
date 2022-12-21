import { signInWithGooglePopup, createUserDocFromAuth } from "../../utils/firebase.utils";

const SignIn = () => {
    // calling to DB - async
    const logGoogleUser = async() => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocFromAuth(user);
    };

    return(
        <div>
            <h1>Sign in screen</h1>
            <button onClick={logGoogleUser}>
                Sign In With Google Popup
                </button>
        </div>
    )
}

export default SignIn;