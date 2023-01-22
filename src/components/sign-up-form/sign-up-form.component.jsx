import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from "../../utils/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {
    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        // takes the name as a identifier
        const { name, value } = event.target;

        // '...' takes the previous attributes that are not being updated upon and places them inside object but modifies the value currently being changed instead
        // name - the input's name that is being changed
        setFormFields({...formFields, [name]: value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Ensure passwords are matching
        if(password !== confirmPassword) {
            return alert("Passwords do not match. Please make sure the password and confirm password are matching.");
        } else {
            try {
                // Authenticate User
                const {user} = await createAuthUserWithEmailAndPassword(email, password);

                // Create User Document
                createUserDocFromAuth(user, {displayName});
                resetFormFields();
            } catch(error) {
                if(error.code === 'auth/email-already-in-use') {
                    return alert("Cannot create account. Email already in use.");
                }
                console.log(error);
            }
        }
    };

    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput type="text" label="Display name" name="displayName" onChange={handleChange} value={displayName}/>

                <FormInput label="Email" type="email" name="email" onChange={handleChange} value={email}/>

                <FormInput label="Password" type="password" name="password" onChange={handleChange} minLength="6" value={password}/>

                <FormInput label="Confirm Password" type="password" name="confirmPassword" onChange={handleChange} minLength="6" value={confirmPassword}/>

                <Button type="Submit">Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;