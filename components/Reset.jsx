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
        const emailRef = useRef();
        const passwordRef = useRef();
        const password1Ref = useRef();
        const router = useRouter();

        async function submitHandler(event) {

            //prevent submission
            event.preventDefault();
    
            const email = emailRef.current.value;
            const password = passwordRef.current.value;
            const password1 = password1Ref.current.value;

            try {
                const result = await updateUser(email, password, password1, router);
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
                    <input type="email" name="email" placeholder="Email Address" required ref={emailRef}/>
                    <label></label>
                    <input type="password" name="password" placeholder="Password" required ref={passwordRef}/>
                    <label></label>
                    <input type="password" name="password1" placeholder="Confirm Password" required ref={password1Ref} />
                    <button type='submit'>Submit</button>
                <closeform></closeform></form>
            </div>
        </div>
    );
};

export default update;