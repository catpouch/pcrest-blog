import nextConnect from "next-connect"
import fs from 'fs'

const apiRoute = nextConnect({
    onNoMatch(req, res) {
        res.status(405).send('Only GET requests allowed!')
    }
})

apiRoute.get(async (req, res) => {
    const { image } = await req.query
    const path = `./uploads/${image}`
    const stat = fs.statSync(path)
    res.writeHead(200, {'Content-Type': 'image/webp', 'Content-Length': stat.size})
    const stream = fs.createReadStream(path)
    stream.pipe(res)
})

export default apiRoute