import styles from './under_construxion.module.scss'

export default function UnderContsruxion() {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.header}>This page is currently under construction!</h1>Please come back later.<a href='/'>&#8592; Return to home</a>
        </div>
    )
}