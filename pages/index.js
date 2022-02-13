import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import PostList from '../components/PostList'
import * as matter from 'gray-matter'

const fs = require("fs")

export default function Home({posts}) {
  console.log(posts)
  return (
    <div className="container">
      <Head>
        <title>Goat Scene and Herd</title>
      </Head>

      <main>
        <Header/>
        <PostList posts={posts}/>
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const files = fs.readdirSync('./posts')
  const posts = files.map(name => {
    const post = fs.readFileSync('./posts/' + name)
    const {data: frontmatter} = matter(post)
    return frontmatter
  })
  return  {
    props: {
      posts
    }
  }
}