import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from "../../utils/firebase.utils";

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
                await createUserDocFromAuth(user, {displayName});
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
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input type="text" name="displayName" onChange={handleChange} value={displayName} required/>

                <label>Email</label>
                <input type="email" name="email" onChange={handleChange} value={email} required/>

                <label>Password</label>
                <input type="password" name="password" onChange={handleChange} minlength="6" value={password} required/>

                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" onChange={handleChange} minlength="6" value={confirmPassword} required/>

                <button type="Submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpForm;