import Image from 'next/image'

export default function PostList({posts}) {
    function generatePostText(post) {
        return (
            <div>
                {post.title ? post.title : ""}
                {post.date ? ", date posted: " + post.date : ""}
                <br/>
                {post.description ? post.description : ""}
                {post.thumbnailUrl ? <Image src={post.thumbnailUrl} width={1080} height={949}/> : null}
            </div>
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