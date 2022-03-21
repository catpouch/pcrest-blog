import styles from './CondensedPostList.module.scss'
import Link from 'next/link'
import {useRef, useEffect} from 'react'
import {useRouter} from 'next/router'

export default function CondensedPostList({posts}) {
    const router = useRouter()
    const menuRef = useRef(null)
    useEffect(() => {
        menuRef.current.style.visibility = 'hidden'
    }, [])

    var slug = null
    var oldSlug = null
    function openMenu(e) {
        slug = e.target.parentElement.parentElement.getAttribute('data-slug')
        if(menuRef.current.style.visibility === 'hidden') {
            menuRef.current.style.visibility = 'visible'
        } else if(slug === oldSlug) {
            menuRef.current.style.visibility = 'hidden'
        }
        oldSlug = slug
    }

    async function deletePost(e) {
        if(slug) {
            await fetch('/api/delete_post/' + slug, {
                method: 'DELETE'
            })
            router.reload(window.location.pathname)
            return
        }
    }

    function generatePost(post) {
        return (
            <div className={styles.topWrapper} key={post.slug} data-slug={post.slug}>
                <Link href={'/posts/' + post.slug}>
                    <a className={styles.postWrapper}>
                        <div className={styles.textWrapper}>
                            <div className={styles.title}>
                                {post.title ? post.title : ""}
                            </div>
                            <div className={styles.authorDate}>
                                {post.author ? "by " + post.author + ", " : ""}
                                {post.date ? post.date : ""}
                            </div>
                        </div>
                    </a>
                </Link>
                <button className={styles.hamburger} onClick={openMenu}>
                    <img src='/hamborger.svg'/>
                </button>
            </div>
        )
    }

    return (
        <div>
            <div className={styles.listWrapper}>
                <a className={styles.createPost} href='/create_post'>+ Create post</a>
                {posts.map((post) => (
                    generatePost(post.frontmatter)
                ))}
            </div>
            <div className={styles.menu} ref={menuRef}>
                <button>Edit post (currently unavailable)</button>
                <button onClick={deletePost}>Delete post</button>
            </div>
        </div>
    )
}