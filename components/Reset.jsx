import styles from "./All.module.css";
import {useState, useRef} from "react";
import { useRouter } from 'next/router';


async function updateUser(email, password, password1, router) {
    const response = await fetch('http://localhost:3001/forgotpass', {
        method: 'POST',
        body: JSON.stringify({email, password, password1 }),
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
    const update = () => {
        const emailPassRef = useRef();
        const passwordPassRef = useRef();
        const password1PassRef = useRef();
        const router = useRouter();

        async function submitHandler(event) {

            //prevent submission
            event.preventDefault();
    
            const enteredEmail = emailPassRef.current.value;
            const enteredPassword = passwordPassRef.current.value;
            const enteredPassword1 = password1PassRef.current.value;

            try {
                const result = await updateUser(enteredEmail, enteredPassword, enteredPassword1, router);
                console.log(result);
            } catch (error) {
                alert(error)
            }
        }
    return (
        <div className={styles.container}>
            <div className={styles.newbox}>
                <h1>New Password</h1>
                <form onSubmit={submitHandler}>
                    <label></label>
                    <input type="email" name="email" placeholder="Email Address" required ref={emailPassRef}/>
                    <label></label>
                    <input type="password" name="password" placeholder="Password" required ref={passwordPassRef}/>
                    <label></label>
                    <input type="password" name="password1" placeholder="Confirm Password" required ref={password1PassRef} />
                    <button type='submit'>Submit</button>
                <closeform></closeform></form>
            </div>
        </div>
    );
};

export default update;