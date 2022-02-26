import Image from 'next/image'
import headerImage from '../public/header.png'
import styles from './Header.module.scss'
import Link from 'next/link'

export default function Header() {
    return (
        <div className={styles.topWrapper}>
            <div className={styles.imgWrapper}>
                <Image src={headerImage} objectFit='cover' layout='fill' />
            </div>
            <div className={styles.textWrapper}>
                <Link href='/'>
                    <a className={styles.title}>The Goat Scene & Herd</a>
                </Link>
                <div className={styles.subtitle}>To Inform and Entertain the Pacific Crest Community</div>
            </div>
        </div>
    )
}