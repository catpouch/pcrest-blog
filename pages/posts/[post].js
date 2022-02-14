import fs from 'fs'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'

export default function Post(props) {
    return (
        <div>
            <div>{props.frontmatter.title}</div>
            <ReactMarkdown>{props.content}</ReactMarkdown>
        </div>
    )
}

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
        fallback: false
    }
}

export async function getStaticProps({params: {post}}) {
    const markdown = fs.readFileSync('./posts/' + post + '.md', 'utf-8')
    const {data: frontmatter, content} = matter(markdown)
    return {
        props: {
            frontmatter,
            content
        }
    }
}