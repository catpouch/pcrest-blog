import CondensedPostList from '../components/CondensedPostList'
import fs from 'fs'

export default function AdminPortal({posts}) {
    return (
        <div>
            <CondensedPostList posts={posts}/>
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