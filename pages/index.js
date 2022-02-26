import Head from 'next/head'
import Header from '../components/Header'
import Toolbar from '../components/Toolbar'
import PostList from '../components/PostList'
import matter from 'gray-matter'
import fs from 'fs'
import styles from './index.module.scss'

export default function Home({posts}) {
  return (
    <div className="container">
      <Head>
        <title>Goat Scene and Herd</title>
      </Head>

      <main>
        <Header/>
        <Toolbar/>
        <PostList posts={posts}/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>a
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