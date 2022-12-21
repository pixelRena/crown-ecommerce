import { signInWithGooglePopup } from "../../utils/firebase.utils";

const SignIn = () => {
    // calling to DB - async
    const logGoogleUser = async() => {
        const res = await signInWithGooglePopup();
        console.log(res);
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