import fs from 'fs'

export default async function handler(req, res) {
    if(req.method !== 'DELETE') {
        return res.status(405).send('Only DELETE requests allowed!')
    }
    const { delete_post } = await req.query
    fs.unlinkSync('./posts/' + delete_post + '.md')
    res.status(204).end()
}