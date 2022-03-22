import styles from './CondensedPostList.module.scss'
import Link from 'next/link'
import {useRef, useEffect} from 'react'
import {useRouter} from 'next/router'

export default function CondensedPostList({posts}) {
    const router = useRouter()
    const menuRef = useRef(null)
    const warningRef = useRef(null)
    const cancelDeleteRef = useRef(null)
    useEffect(() => {
        menuRef.current.style.visibility = 'hidden'
        warningRef.current.style.visibility = 'hidden'
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
        menuRef.current.style.top = e.target.getBoundingClientRect().top + window.scrollY + 24 + 'px'
        oldSlug = slug
    }

    function openWarningMenu() {
        warningRef.current.style.visibility = 'visible'
    }

    function closeWarningMenu(e) {
        if(e.target === warningRef.current || e.target === cancelDeleteRef.current) {
            warningRef.current.style.visibility = 'hidden'
        }
    }

    async function deletePost(e) {
        if(slug) {
            warningRef.current.style.visibility = 'hidden'
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
                <button disabled title='Currently unavailable. Ask Isaac to edit the post manually.'>Edit post</button>
                <button onClick={openWarningMenu}>Delete post</button>
            </div>
            <div className={styles.warningWrapper} ref={warningRef} onClick={closeWarningMenu}>
                <div className={styles.warning} ref={warningRef}>
                    <h1>Are you sure you want to delete this post?</h1>
                    <button className={styles.buttonConfirm} onClick={deletePost}>Confirm</button>
                    <button onClick={closeWarningMenu}  ref={cancelDeleteRef}>Cancel</button>
                </div>
            </div>
        </div>
    )
}