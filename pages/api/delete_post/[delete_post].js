import fs from 'fs'
import { getSession } from 'next-auth/react'
import permissions from '../../../user_permissions.json'

export default async function handler(req, res) {
    const session = await getSession({ req })
    if(!session || !permissions.admins.includes(session.user.email)) {
        return res.status(403).end()
    }
    if(req.method !== 'DELETE') {
        return res.status(405).send('Only DELETE requests allowed!')
    }
    const { delete_post } = await req.query
    try {
        fs.unlinkSync('./posts/' + delete_post + '.md')
    } catch(e) {
        return res.status(410).end()
    }
    return res.status(204).end()
}