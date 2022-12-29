import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth, signInUserWithEmailAndPassword,signInWithGooglePopup } from "../../utils/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button from "../button/button.component";

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { email, password } = formFields;

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocFromAuth(user);
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const { name, value}  = event.target;
        setFormFields({...formFields, [name]: value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const {user} = await signInUserWithEmailAndPassword(email, password);
            resetFormFields();
    
        } catch(error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert("Incorrect password. Please try again.");
                    break;
                case 'auth/user-not-found':
                    alert("Account does not exist.");
                    break;
                default:
                    console.log(error.message);
            }
        }
    };

    return(
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" name="email" onChange={handleChange} value={email}/>
                <FormInput label="Password" type="password" name="password" onChange={handleChange} value={password}/>
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType='google' onClick={signInWithGoogle}>
                    Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;