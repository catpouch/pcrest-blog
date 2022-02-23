import styles from './Toolbar.module.scss'

export default function Toolbar() {
    return (
        <ul className={styles.bottomWrapper}>
            <li key={0}>
                HOME
            </li>
            <li key={1}>
                THE 2019-20 TEAM
            </li>
            <li key={2}>
                ABOUT US
            </li>
        </ul>
    )
}