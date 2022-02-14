import Image from 'next/image'
import Link from 'next/link'

export default function PostList({posts}) {
    function generatePostText(post) {
        return (
            <Link href={'/posts/' + post.slug}>
                <div>
                    {post.title ? post.title : ""}
                    {post.date ? ", date posted: " + post.date : ""}
                    <br/>
                    {post.description ? post.description : ""}
                    {post.thumbnailUrl ? <Image src={post.thumbnailUrl} width={200} height={200}/> : null}
                </div>
            </Link>
        )
    }

    return (
        <ul>
            {posts.map((post) => (
                <li key={post.title}>{generatePostText(post)}</li>
            ))}
        </ul>
    )
}