import {signIn} from 'next-auth/react'
import styles from './failed_sign_in.module.scss'

export default function FailedSignIn() {
    return (
        <div className={styles.wrapper}>
            <h1>Sign in failed.</h1>Try again with a PCCS email (ending in @pcrest.org).<button onClick={() => signIn('google')}>SIGN IN</button>
        </div>
    )
}