import Image from 'next/image'
import Link from 'next/link'
import styles from './PostList.module.scss'

export default function PostList({posts}) {
    function generatePost(post) {
        return (
            <Link href={'/posts/' + post.slug}>
                <a className={styles.postWrapper}>
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
                </a>
            </Link>
        )
    }

    return (
        <div className={styles.listWrapper}>
            {posts.map((post) => (
                <div key={post.name}>{generatePost(post.frontmatter)}</div>
            ))}
        </div>
    )
}