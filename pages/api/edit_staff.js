import fs from 'fs'
import nextConnect from 'next-connect'
import multer from 'multer'
import { getSession } from 'next-auth/react'
import permissions from '../../user_permissions.json'

const upload = multer({
    // storage: multer.diskStorage({
    //     destination: './uploads',
    //     filename: (req, file, cb) => {
    //         const regex = /(?:\.([^.]+))?$/
    //         cb(null, `${processTitle(req.body.title)}_thumbnail.${regex.exec(file.originalname)[1]}`)
    //     }
    // })
})

const apiRoute = nextConnect ({
    onNoMatch(req, res) {
        res.status(405).end('Only POST requests allowed!')
    },
    onError(err, req, res, next) {
        console.log(err)
        res.status(500).end('Internal server error.')
    }
})

// apiRoute.use(upload.single('thumbnail'))
apiRoute.use(upload.any())

apiRoute.post(async (req, res) => {
    const session = await getSession({ req })
    if(!session || !permissions.admins.includes(session.user.email)) {
        return res.status(403).end()
    }

    const body = req.body
    console.log(req.body)
    
    // const keys = Object.keys(body)
    // if(!(keys.length === 5 && keys[0] === 'title' && keys[1] === 'author' && keys[2] === 'description' && keys[3] === 'content' && keys[4] === 'name')) {
    //     return res.status(400).send('Invalid request!')
    // }

    const final = {
        description: body.description,
        students: []
    }

    fs.writeFileSync('./staff_info.json', JSON.stringify(final))

    try {
        await res.unstable_revalidate('/journalism_staff')
        return res.writeHead(201).end()
    } catch(err) {
        console.log(err)
        return res.status(500).send('Failed to revalidate page.')
    }
})

export default apiRoute

export const config = {
    api: {
        bodyParser: false
    }
}