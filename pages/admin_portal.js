import CondensedPostList from '../components/CondensedPostList'
import fs from 'fs'
import permissions from '../user_permissions.json'
import {useRouter} from 'next/router'
import {getSession} from 'next-auth/react'

export default function AdminPortal({posts}) {
    const router = useRouter()

    return (
        <div>
            <CondensedPostList posts={posts}/>
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if(!session || !permissions.admins.includes(session.user.email)) {
        context.res.writeHead(302, {Location: '/unauthorized'})
        context.res.end()
        return {props: {}}
    }
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
            posts,
            user: session.user
        }
    }
}