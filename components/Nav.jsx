import styles from "./All.module.css";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const Nav = () => {
    return(
        <div>
            <header className={styles.header}>
                <h4 className={styles.brand}>Motion Detector</h4>
                <Link className={styles.navlink} onClick={() => signOut()} href="/">Logout</Link>
            </header> 
        </div>
        
    );
};

export default Nav;