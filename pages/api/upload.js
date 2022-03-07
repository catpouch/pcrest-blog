import fs from 'fs'
import nextConnect from 'next-connect'
import multer from 'multer'
import { getSession } from 'next-auth/react'
import permissions from '../../user_permissions.json'

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
        destination: './public/uploads',
        filename: (req, file, cb) => {
            const regex = /(?:\.([^.]+))?$/
            if(file.fieldname === 'thumbnail') {
                cb(null, `${processTitle(req.body.title)}_thumbnail.${regex.exec(file.originalname)[1]}`)
            } else {
                cb(null, `${processTitle(req.body.title)}_image${Date.now()}${Math.round(Math.random() * 1E9)}.${regex.exec(file.originalname)[1]}`)
            }
        }
    })
})

const apiRoute = nextConnect ({
    onNoMatch(req, res) {
        res.status(405).send('Only POST requests allowed!')
    }
})

apiRoute.use(upload.fields([
    {name: 'thumbnail', maxCount: 1},
    {name: 'images'}
]))

apiRoute.post(async (req, res) => {
    function getCurrentDate() {
        var today = new Date()
        var dd = String(today.getDate())
        var mm = String(today.getMonth() + 1)
        var yyyy = today.getFullYear()

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

    var title = processTitle(body.title)

    //IMPORTANT: SANITIZE THIS
    const frontmatter = {
        title: body.title,
        author: body.author,
        date: getCurrentDate(),
        description: body.description,
        thumbnailUrl: `/uploads/${req.files.thumbnail[0].filename}`
    }
    
    let final = {
        frontmatter,
        content: body.content
    }
    fs.writeFileSync('./posts/' + title + '.json', JSON.stringify(final))

    try {
        await res.unstable_revalidate('/')
        await res.unstable_revalidate(`/posts/${title}`)
        return res.redirect(302, `/posts/${title}`)
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