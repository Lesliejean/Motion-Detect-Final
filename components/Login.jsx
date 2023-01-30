import styles from "./All.module.css";
import Link from "next/link";
import {useState, useRef} from "react";
import { useRouter } from 'next/router';
import { getProviders, getSession, signIn, getCsrfToken } from "next-auth/react";
import {useFormik} from 'formik';

async function validateUser(username, password, router) {
	const response = await signIn('credentials', {
	    redirect: false,
	    username: username,
	    password: password,
	}).then(response => {
		console.log(response)
		if (!response.ok) {
			alert(response.error)
		} else {
			router.push('http://localhost:3000/main')
		}
	});
}
export default function Login({ providers, csrfToken }) {
    const router = useRouter();
	const usernameInputRef = useRef();
	const passwordInputRef = useRef();
	
	//handle the form
	async function submitHandler(event) {
		//prevent submission
	    event.preventDefault();

	    const enteredUsername = usernameInputRef.current.value;
	    const enteredPassword = passwordInputRef.current.value;

	    //validate the form
	    if ( enteredUsername == null || enteredUsername == '' ) {
	        alert("Please enter your username.");
	        return
	    }

	    if ( enteredPassword == null || enteredPassword == '' ) {
	        alert("Please enter your password.");
	        return
	    }

	    try {
	        const result = await validateUser(enteredUsername, enteredPassword, router);
	        console.log(result);
	    } catch (error) {
	    	alert(error)
	    }
	}

    return(
        <div className={styles.container}>
            <div className={styles.loginbox}>
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <label></label>
                <label></label>
                <input type="text"  name="username" placeholder="Username" required ref={usernameInputRef}/>
                <label></label>
                <input type="password"  name="password" placeholder="Password" required ref={passwordInputRef}/>
                <button type='submit'>Login</button>
            <closeform></closeform></form>
            <p> 
                <Link href="/reset">Forgot Password?</Link>
                <br/>
                <br/>
                <br/>
                No account? 
                <Link href="/signup"> click here</Link>
            </p>
        </div>
        </div>
        
    );
};

