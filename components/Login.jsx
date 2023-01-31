import styles from "./All.module.css";
import Link from "next/Link";
import {useState, useRef} from "react";
import { useRouter } from 'next/router';
import { getProviders, getSession, signIn, getCsrfToken } from "next-auth/react";


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

	    const usernameval = usernameRef.current.value;
	    const passwordval = passwordRef.current.value;

	    //validate the form
	    if ( usernameval == null || usernameval == '' ) {
	        alert("Please enter your username.");
	        return
	    }

	    if ( passwordval == null || passwordval == '' ) {
	        alert("Please enter your password.");
	        return
	    }

	    try {
	        const result = await validateUser(usernameval, passwordval, router);
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
                <a href="/reset">Forgot Password?</a>
                <br/>
                <br/>
                <br/>
                No account? 
                <a href="/signup"> click here </a>
            </p>
        </div>
        </div>
        
    );
};

