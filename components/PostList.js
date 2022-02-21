import Image from 'next/image'
import Link from 'next/link'
import styles from './PostList.module.scss'

export default function PostList({posts}) {
    function generatePostText(post) {
        return (
            <Link href={'/posts/' + post.slug}>
                <div className={styles.postWrapper}>
                    <div className={styles.thumbWrapper}>
                        {post.thumbnailUrl ? <Image src={post.thumbnailUrl} objectFit='cover' layout='fill'/> : null}
                    </div>
                    <div className={styles.textWrapper}>
                        <div className={styles.title}>
                            {post.title ? post.title : ""}
                        </div>
                        <div className={styles.description}>
                            {post.description ? post.description : ""}
                        </div>
                        <div className={styles.authorDate}>
                            {post.author ? post.author + ", " : ""}
                            {post.date ? post.date : ""}
                        </div>
                    </div>
                </div>
            </Link>
        )
    }

    return (
        <div className={styles.listWrapper}>
            {posts.map((post) => (
                <div>{generatePostText(post.frontmatter)}</div>
            ))}
        </div>
    )
}