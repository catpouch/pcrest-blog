import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import PostList from '../components/PostList'

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

export async function getStaticProps() {
  const files = fs.readdirSync('./posts')
  const posts = files.map(name => {
    return {
      title: name.slice(0, -4)
    }
  })
  return  {
    props: {
      posts
    }
  }
}