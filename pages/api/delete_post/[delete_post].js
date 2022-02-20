export default async function handler(req, res) {
    /*if(req.method !== 'DELETE') {
        return res.status(405).send('Only DELETE requests allowed!')
    }*/
    //const { delete_post } = await req.query
    //bruh
    return res.redirect(302, '/')
}