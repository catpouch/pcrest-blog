import styles from './CondensedPostList.module.scss'
import Link from 'next/link'

export default function CondensedPostList({posts}) {
    function generatePost(post) {
        return (
            <div className={styles.topWrapper}>
                <Link href={'/posts/' + post.slug}>
                    <a className={styles.postWrapper}>
                        <div className={styles.textWrapper}>
                            <div className={styles.title}>
                                {post.title ? post.title : ""}
                            </div>
                            <div className={styles.authorDate}>
                                {post.author ? post.author + ", " : ""}
                                {post.date ? post.date : ""}
                            </div>
                        </div>
                    </a>
                </Link>
                <div className={styles.hamburger}>
                    <img src='/hamborger.svg'/>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.listWrapper}>
            {posts.map((post) => (
                <div key={post.frontmatter.slug}>{generatePost(post.frontmatter)}</div>
            ))}
        </div>
    )
}