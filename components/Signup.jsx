import styles from "./All.module.css";
import Link from "next/link";
import {useState, useRef} from "react";
import { useRouter } from 'next/router';

import { useSession, signIn, signOut } from "next-auth/react";

async function createUser(username, email, password, password1, router) {
  const response = await fetch('http://localhost:3001/register', {
     method: 'POST',
     body: JSON.stringify({username, email, password, password1 }),
     headers: {
         'Content-Type': 'application/json',
     },
  });
    const data = await response.json();

  	if (!response.ok) {
    	alert(data.message);
  	} else {
  		alert(data.message);
  		router.push('/')
  	}
  	return data;
}



const Signup = () => {
  	const usernameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
  	const password1Ref = useRef();

	const router = useRouter();
  async function submitHandler(event) {

		//prevent submission
	    event.preventDefault();

	    const username = usernameRef.current.value;
	    const email = emailRef.current.value;
	    const password = passwordRef.current.value;
      	const password1 = password1Ref.current.value;
	    //validate the form
	    if ( username == null || username == '' ) {
	        alert("Please enter your username.");
	        return
	    }

	    if ( email == null || email == '' ) {
	        alert("Please enter your email.");
	        return
	    }

	    if ( password == null || password == '' ) {
	        alert("Please enter your password.");
	        return
	    } else {
	    	if ( password.trim().length < 7 ) {
	    	    alert("Password should be of atleast 7 characters.");
	    	    return
	    	}
	    }


	    //if the form passes, try to create user
	    try {
	        const result = await createUser(username, email, password, password1, router);
	        console.log(result);
	    } catch (error) {
	    	alert(error)
	    }
	}
    return(
    <div className={styles.container}>
        <div className={styles.signupbox}>
			<h1>Create Account</h1>
			<form onSubmit={submitHandler}>
				<label></label>
				<input type="email" name="email" placeholder="Email Address" required ref={emailRef}/>
				<label></label>
				<input type="text" name="username" placeholder="Username"  required ref={usernameRef}/>
				<label></label>
				<input type="password" name="password" placeholder="Password" required ref={passwordRef}/>
				<label></label>
				<input type="password" name="password1" placeholder="Confirm Password" required ref={password1Ref} />
				<button type='submit'>Sign Up</button>
			<closeform></closeform></form>
			<p>
				Already have an account? 
				<a href="/" onClick={() => signIn()}> Login here </a>
			</p>
		</div>
    </div>
    );
};


export default Signup;