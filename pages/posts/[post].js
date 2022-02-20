import fs from 'fs'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import DefaultErrorPage from 'next/error'

export default function Post(props) {

    function delete_post(e) {
        //redirects dont work help
        /*fetch(`/api/delete_post/${props.post}`, {
            method: 'POST',
            redirect: 'follow'
        })*/
        fetch(`/api/delete_post/${props.post}`)
        console.log("yo")
    }

    if(!props) {
        return (
            <DefaultErrorPage statusCode={404}/>
        )
    }

    return (
        <div>
            <div>{props.frontmatter.title}</div>
            <ReactMarkdown>{props.content}</ReactMarkdown>
            <button onClick={delete_post}>delete post</button>
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
        const markdown = fs.readFileSync('./posts/' + post + '.md', 'utf-8')
        const {data: frontmatter, content} = matter(markdown)
        return {
            props: {
                post,
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