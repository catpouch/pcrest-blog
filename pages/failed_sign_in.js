import {signIn} from 'next-auth/react'
import styles from './failed_sign_in.module.scss'

export default function FailedSignIn() {
    return (
        <div className={styles.wrapper}>
            <h1>Sign in failed.</h1>Try again with a PCCS email (ending in @pcrest.org).
            <button onClick={() => signIn('google')}>SIGN IN</button>
            <span style={{'fontSize': '0.7rem', 'marginTop': '0.6rem', 'color': '#444'}}>If you didn't get the option to pick an account, contact Isaac Milstein at isaacm25@pcrest.org.</span>
        </div>
    )
}