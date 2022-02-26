import { useSession, signIn, signOut } from 'next-auth/react'
import styles from './Toolbar.module.scss'

export default function Toolbar() {
    const {data: session} = useSession()
    var sign
    if(session) {
        sign = (
            <a key={3} onClick={() => signOut()}>
                SIGN OUT
            </a>
        )
    } else {
        sign = (
            <a key={3} onClick={() => signIn()}>
                SIGN IN
            </a>
        )
    }
    return (
        <ul className={styles.bottomWrapper}>
            <a key={0}>
                WHAT BUTTONS SHOULD GO HERE?
            </a>
            <a key={1}>
                ADD SOME
            </a>
            {sign}
        </ul>
    )
}