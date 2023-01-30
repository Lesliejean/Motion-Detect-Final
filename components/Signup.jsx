import styles from "./All.module.css";
import Link from "next/link";
import {useState, useRef} from "react";
import { useRouter } from 'next/router';

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
  	const usernameInputRef = useRef();
	const emailInputRef = useRef();
	const passwordInputRef = useRef();
  	const password1InputRef = useRef();

	const router = useRouter();
  async function submitHandler(event) {

		//prevent submission
	    event.preventDefault();

	    const enteredUsername = usernameInputRef.current.value;
	    const enteredEmail = emailInputRef.current.value;
	    const enteredPassword = passwordInputRef.current.value;
      	const enteredPassword1 = password1InputRef.current.value;
	    //validate the form
	    if ( enteredUsername == null || enteredUsername == '' ) {
	        alert("Please enter your username.");
	        return
	    }

	    if ( enteredEmail == null || enteredEmail == '' ) {
	        alert("Please enter your email.");
	        return
	    }

	    if ( enteredPassword == null || enteredPassword == '' ) {
	        alert("Please enter your password.");
	        return
	    } else {
	    	if ( enteredPassword.trim().length < 7 ) {
	    	    alert("Password should be of atleast 7 characters.");
	    	    return
	    	}
	    }


	    //if the form passes, try to create user
	    try {
	        const result = await createUser(enteredUsername, enteredEmail, enteredPassword, enteredPassword1, router);
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
				<input type="email" name="email" placeholder="Email Address" required ref={emailInputRef}/>
				<label></label>
				<input type="text" name="username" placeholder="Username"  required ref={usernameInputRef}/>
				<label></label>
				<input type="password" name="password" placeholder="Password" required ref={passwordInputRef}/>
				<label></label>
				<input type="password" name="password1" placeholder="Confirm Password" required ref={password1InputRef} />
				<button type='submit'>Sign Up</button>
			<closeform></closeform></form>
			<p>
				Already have an account? 
				<Link href="/">Login here</Link>
			</p>
		</div>
    </div>
    );
};


export default Signup;