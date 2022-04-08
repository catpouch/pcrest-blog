import fs from 'fs'
import DefaultErrorPage from 'next/error'
import styles from './post.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import parse, { attributesToProps } from 'html-react-parser'

export default function Post(props) {
    const processOptions = {
        replace: domNode => {
            if(domNode.name === 'img') {
                return <Image {...attributesToProps(domNode.attribs)}/>
            }
        }
    }

    if(!props) {
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
                    <div className={styles.title}><h1>{props.frontmatter.title}</h1>Posted on {props.frontmatter.date} by {props.frontmatter.author}</div>
                    <div className={styles.edited}>{props.frontmatter.edited ? `Edited on ${props.frontmatter.edited}` : null}</div>
                    <div className={styles.thumbnail}>
                        {props.frontmatter.thumbnailUrl ? <Image src={`http://localhost:54410/api/images/${props.frontmatter.thumbnailUrl}`} objectFit='cover' layout='fill'/> : null}
                    </div>
                    {parse(props.content, processOptions)}
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
        const postJSON = JSON.parse(fs.readFileSync('./posts/' + post + '.json', 'utf-8'))
        const frontmatter = postJSON.frontmatter
        const content = postJSON.content
        //const image = await fetch(`http://localhost:54410/api/images/${frontmatter.thumbnailUrl}`)
        //const image = fs.readFileSync('./uploads/' + frontmatter.thumbnailUrl)
        //const image = require(`../../uploads/${frontmatter.thumbnailUrl}`)
        //how do i fix this?
        //console.log(image)
        return {
            props: {
                frontmatter,
                content,
                //image
            }
        }
    } catch(err) {
        console.log('Attempted access to non-existent post: ' + post)
        return {
            notFound: true
        }
    }
}