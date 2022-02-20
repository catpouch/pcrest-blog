import styles from './Toolbar.module.scss'

export default function Toolbar() {
    return (
        <ul className={styles.bottomWrapper}>
            <li>
                HOME
            </li>
            <li>
                THE 2019-20 TEAM
            </li>
            <li>
                ABOUT US
            </li>
        </ul>
    )
}