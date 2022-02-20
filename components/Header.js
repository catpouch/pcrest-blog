import Image from 'next/image'
import headerImage from '../public/header.png'
import styles from './Header.module.scss'

export default function Header() {
    return (
        <div className={styles.topWrapper}>
            <div className={styles.imgWrapper}>
                <Image src={headerImage} objectFit='cover' layout='fill' />
            </div>
            <div className={styles.textWrapper}>
                <div className={styles.title}> The Goat Scene & Herd </div>
                <div className={styles.subtitle}> To Inform and Entertain the Pacific Crest Community </div>
            </div>
        </div>
    )
}