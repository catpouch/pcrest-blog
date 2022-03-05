import fs from 'fs'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import DefaultErrorPage from 'next/error'
import styles from './post.module.scss'
import Image from 'next/image'
import Link from 'next/link'

const components = {
    Image: (props) => (
        <Image {...props} />
    )
}

export default function Post({source}) {
    if(!source) {
        return (
            <DefaultErrorPage statusCode={404}/>
        )
    }

    return (
        <div>
            <div className={styles.contentWrapper}>
                <Link href='/'>
                    <div className={styles.home}>
                        <span id={styles.one}>&#8592; Return to home</span>
                        <span id={styles.two}>&#8592;</span>
                    </div>
                </Link>
                <div className={styles.textWrapper}>
                    <div className={styles.title}><h1>{source.frontmatter.title}</h1>Posted on {source.frontmatter.date} by {source.frontmatter.author}</div>
                    <div className={styles.thumbnail}>
                        {source.frontmatter.thumbnailUrl ? <Image src={source.frontmatter.thumbnailUrl} objectFit='cover' layout='fill'/> : null}
                    </div>
                    <MDXRemote {...source} components={components}/>
                </div>
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export async function getStaticProps({params: {post}}) {
    try {
        const markdown = fs.readFileSync('./posts/' + post + '.mdx', 'utf-8')
        const source = await serialize(markdown, {parseFrontmatter: true})
        return {
            props: {
                source
            }
        }
    } catch(err) {
        console.log(err)
        return {
            notFound: true
        }
    }
}