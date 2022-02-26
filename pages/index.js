import Head from 'next/head'
import PostList from '../components/PostList'
import matter from 'gray-matter'
import fs from 'fs'

export default function Home({posts}) {
  return (
    <div className="container">
      <Head>
        <title>Goat Scene and Herd</title>
      </Head>

      <main>
        <PostList posts={posts}/>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const files = fs.readdirSync('./posts')
  const posts = files.map(name => {
    const post = fs.readFileSync('./posts/' + name)
    const {data: frontmatter} = matter(post)
    frontmatter.slug = name.replace('.md', '')
    return {
      name,
      frontmatter
    }
  })
  return  {
    props: {
      posts
    }
  }
}