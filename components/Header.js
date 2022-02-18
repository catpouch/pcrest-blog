import Image from 'next/image'
import styles from './Header.module.scss'

export default function Header() {
    return (
        <div>
            <div>
                <div className={styles.imgWrapper}>
                    <Image src='https://i.redd.it/3eealqlmb8m61.jpg' layout='fill' />
                </div>
                <div>
                    <div> The Goat Scene & Herd </div>
                    <div> To Inform and Entertain the Pacific Crest Community </div>
                </div>
            </div>
            <div>
                INSERT BUTTONS HERE
            </div>
        </div>
    )
}