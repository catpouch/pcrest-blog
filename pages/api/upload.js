import fs from 'fs'
import nextConnect from 'next-connect'
import multer from 'multer'
import { getSession } from 'next-auth/react'
import permissions from '../../user_permissions.json'
import sharp from 'sharp'

function processTitle(title) {
    const files = fs.readdirSync('./posts')
    const regex = /[\W]/g
    let pretitle = title
    pretitle = pretitle.replace(/ /g, '_').replace(regex, '')
    let index = 1
    var title = pretitle
    while(files.includes(title + '.json')) {
        title = pretitle + '_' + index
        index++
    }
    return title.toLowerCase()
}

const upload = multer({
    storage: multer.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
            const arr = file.mimetype.split('/')
            const dir = String(Date.now() + '.' + arr[arr.length - 1])
            cb(null, dir)
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

apiRoute.use(upload.fields([
    {name: 'thumbnail', maxCount: 1},
    {name: 'images'}
]))

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

    if(!(keys.length === 4 && keys[0] === 'title' && keys[1] === 'author' && keys[2] === 'description' && keys[3] === 'content')) {
        return res.status(400).send('Invalid request!')
    }

    let thumbnailName = null

    for(const file in req.files) {
        const dir = `uploads/${req.files[file][0].filename}`
        if(file === 'thumbnail') {
            thumbnailName = `${processTitle(body.title)}_thumbnail.webp`
            await sharp(dir).toFile(`uploads/${thumbnailName}`)
        } else {
            thumbnailName = `${processTitle(body.title)}_image${Date.now()}${Math.round(Math.random() * 1E9)}.webp`
            await sharp(dir).toFile(`uploads/${thumbnailName}`)
        }
        fs.unlinkSync(dir)
    }

    var title = processTitle(body.title)

    const frontmatter = {
        title: body.title,
        author: body.author,
        date: getCurrentDate(),
        description: body.description,
        thumbnailUrl: thumbnailName
    }
    
    let final = {
        frontmatter,
        content: body.content
    }
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