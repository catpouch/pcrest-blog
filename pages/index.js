import Head from 'next/head'
import PostList from '../components/PostList'
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
  const files = fs.readdirSync('./posts').filter(name => {
    if(!name.endsWith('.json')) {
      return false
    }
    return true
  })
  const posts = files.map(name => {
    let frontmatter = JSON.parse(fs.readFileSync('./posts/' + name, 'utf-8')).frontmatter
    frontmatter.slug = name.replace('.json', '')
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