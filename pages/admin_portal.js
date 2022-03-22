import CondensedPostList from '../components/CondensedPostList'
import fs from 'fs'
import {useSession} from 'next-auth/react'
import {useRouter} from 'next/router'

export default function AdminPortal({posts}) {
  const {data: session, status} = useSession()
  const router = useRouter()

  if(status === 'unauthenticated') {
    //THIS DOESN'T CHECK FOR ADMIN PERMS
    //maybe make an api call? just to avoid serversideprops
    router.push('/unauthorized')
  }

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