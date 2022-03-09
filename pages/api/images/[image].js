import nextConnect from "next-connect"
import fs from 'fs'

const apiRoute = nextConnect({
    onNoMatch(req, res) {
        res.status(405).send('Only GET requests allowed!')
    }
})

apiRoute.get(async (req, res) => {
    const { image } = await req.query
    const file = fs.readFileSync(`./uploads/${image}`)
    res.setHeader('Content-Type', 'image/jpg')
    return res.send(file)
})

export default apiRoute