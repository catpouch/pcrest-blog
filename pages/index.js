import Head from 'next/head'
import PostList from '../components/PostList'
import fs from 'fs'
import { serialize } from 'next-mdx-remote/serialize'

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
  const files = fs.readdirSync('./posts').filter(name => {
    if(!name.endsWith('.mdx')) {
      return false
    }
    return true
  })
  let promises = files.map(async name => {
    const post = fs.readFileSync('./posts/' + name)
    const frontmatter = await serialize(post, {parseFrontmatter: true})
    return {
      name,
      ...frontmatter
    }
  })
  let posts = []
  let index = 0
  for await (let val of promises) {
    val.frontmatter.slug = val.name.replace('.mdx', '')
    posts[index] = val
    index++
  }
  console.log(posts[0])
  return  {
    props: {
      posts
    }
  }
}