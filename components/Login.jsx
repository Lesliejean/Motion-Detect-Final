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
	const usernameRef = useRef();
	const passwordRef = useRef();
	
	//handle the form
	async function submitHandler(event) {
		//prevent submission
	    event.preventDefault();

	    const username = usernameRef.current.value;
	    const password = passwordRef.current.value;

	    //validate the form
	    if ( username == null || username == '' ) {
	        alert("Please enter your username.");
	        return
	    }

	    if ( password == null || password == '' ) {
	        alert("Please enter your password.");
	        return
	    }

	    try {
	        const result = await validateUser(username, password, router);
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
                <input type="text"  name="username" placeholder="Username" required ref={usernameRef}/>
                <label></label>
                <input type="password"  name="password" placeholder="Password" required ref={passwordRef}/>
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

