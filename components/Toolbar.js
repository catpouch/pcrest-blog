import styles from './Toolbar.module.scss'

export default function Toolbar() {
    return (
        <ul className={styles.bottomWrapper}>
            <li key={0}>
                WHAT BUTTONS SHOULD GO HERE?
            </li>
            <li key={1}>
                ADD SOME
            </li>
            <li key={2}>
                JEFF
            </li>
        </ul>
    )
}