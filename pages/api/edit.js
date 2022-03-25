import fs from 'fs'
import nextConnect from 'next-connect'
import multer from 'multer'
import { getSession } from 'next-auth/react'
import permissions from '../../user_permissions.json'

function processTitle(title) {
    return title.replace(/ /g, '_').replace(/[\W]/g, '').toLowerCase()
}

const upload = multer({
    storage: multer.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
            const regex = /(?:\.([^.]+))?$/
            cb(null, `${processTitle(req.body.title)}_thumbnail.${regex.exec(file.originalname)[1]}`)
        }
    })
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

apiRoute.use(upload.single('thumbnail'))

apiRoute.post(async (req, res) => {
    function getCurrentDate() {
        const today = new Date()
        const dd = String(today.getDate())
        const mm = String(today.getMonth() + 1)
        const yyyy = today.getFullYear()

        return mm + '/' + dd + '/' + yyyy
    }

    const session = await getSession({ req })
    if(!session || !permissions.admins.includes(session.user.email)) {
        return res.status(403).end()
    }

    const body = req.body
    
    const keys = Object.keys(body)
    
    if(!(keys.length === 5 && keys[0] === 'title' && keys[1] === 'author' && keys[2] === 'description' && keys[3] === 'content' && keys[4] === 'name')) {
        return res.status(400).send('Invalid request!')
    }
    
    var title = processTitle(body.title)

    const final = {
        frontmatter: {
            title: body.title,
            author: body.author,
            date: JSON.parse(fs.readFileSync(`./posts/${body.name}.json`, 'utf8')).frontmatter.date,
            edited: getCurrentDate(),
            description: body.description,
            thumbnailUrl: req.file.filename
        },
        content: body.content
    }

    fs.unlinkSync(`./posts/${body.name}.json`)
    fs.writeFileSync('./posts/' + title + '.json', JSON.stringify(final))

    try {
        await res.unstable_revalidate('/')
        await res.unstable_revalidate(`/posts/${title}`)
        await res.unstable_revalidate('/admin_portal')
        return res.writeHead(201).end(`/posts/${title}`)
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