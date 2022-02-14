import fs from 'fs'

export default function Post({post}) {
    return (
        <div>{post}</div>
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
    return {
        props: {
            post
        }
    }
}