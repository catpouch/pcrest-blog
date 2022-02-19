import fs from 'fs'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import DefaultErrorPage from 'next/error'

export default function Post(props) {
    if(!props) {
        return (
            <DefaultErrorPage statusCode={404}/>
        )
    }

    return (
        <div>
            <div>{props.frontmatter.title}</div>
            <ReactMarkdown>{props.content}</ReactMarkdown>
        </div>
    )
}

/*
export async function getStaticPaths() {
    const paths = fs.readdirSync('./posts').map(name => {
        return {
            params: {
                post: name.replace('.md', '')
            }
        }
    })
    return {
        paths,
        fallback: 'blocking'
    }
}
*/

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export async function getStaticProps({params: {post}}) {
    try {
        const markdown = fs.readFileSync('./posts/' + post + '.md', 'utf-8')
        const {data: frontmatter, content} = matter(markdown)
        return {
            props: {
                frontmatter,
                content
            }
        }
    } catch(err) {
        return {
            notFound: true
        }
    }
}