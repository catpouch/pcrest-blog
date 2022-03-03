import { useSession, signIn, signOut } from 'next-auth/react'
import styles from './Toolbar.module.scss'

export default function Toolbar() {
    const {data: session} = useSession()
    var sign
    if(session) {
        sign = (
            <a key={2} onClick={() => signOut()}>
                SIGN OUT
            </a>
        )
    } else {
        sign = (
            <a key={2} onClick={() => signIn('google')}>
                SIGN IN
            </a>
        )
    }
    return (
        <ul className={styles.bottomWrapper}>
            <a key={0}>
                JOURNALISM STAFF
            </a>
            <a key={1}>
                ADMIN PORTAL
            </a>
            {sign}
            <a key={3}>
                SEARCH
            </a>
        </ul>
    )
}