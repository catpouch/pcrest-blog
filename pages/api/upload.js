import fs from 'fs'
import { getSession } from 'next-auth/react'
import permissions from '../../user_permissions.json'

export default async function handler(req, res) {

    function processContent(content) {
        return content.replace(/(\r\n|\n|\r)\s*/gm, (match) => {
            if(match.startsWith(`\r\n`)) {
                return `  \n&#8203;${'&nbsp;'.repeat(match.length - 2)}`
            }
            return `  \n&#8203;${'&nbsp;'.repeat(match.length - 1)}`
        })
    }

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

    if(req.method !== 'POST') {
        return res.status(405).send('Only POST requests allowed!')
    }

    const body = req.body
    
    const keys = Object.keys(body)

    if(!(keys.length === 5 && keys[0] === 'title' && keys[1] === 'author' && keys[2] === 'description' && keys[3] === 'thumbnail' && keys[4] === 'content')) {
        return res.status(400).send('Invalid request!')
    }

    const files = fs.readdirSync('./posts')
    const regex = /[\W]/g;
    let pretitle = body.title
    pretitle = pretitle.replace(/ /g, '_').replace(regex, '')
    let index = 1
    var title = pretitle

    while(files.includes(title + '.md')) {
        title = pretitle + '_' + index
        index++
    }

    var content = processContent(body.content)

    const frontmatter = `---
title: '${body.title.replace("'", "''")}'
author: '${body.author.replace("'", "''")}'
date: '${getCurrentDate()}'
description: '${body.description.replace("'", "''")}'
thumbnailUrl: '/2022-02-15_17.34.13.png'
---

`

    content = frontmatter + content
    fs.writeFileSync('./posts/' + title + '.md', content)

    try {
        await res.unstable_revalidate('/')
        await res.unstable_revalidate(`/posts/${title}`)
        return res.redirect(302, `/posts/${title}`)
    } catch(err) {
        console.log(err)
        return res.status(500).send('Failed to revalidate page.')
    }
}