export default function PostList({posts}) {
    return (
        <ul>
            {posts.map((post) => (
                <li key={post.title}>{post.title}</li>
            ))}
        </ul>
    )
}