import { getSession } from "next-auth/react"
import permissions from '../user_permissions.json'
import dynamic from "next/dynamic"
import {EditorState, ContentState, convertToRaw, convertFromHTML} from 'draft-js'
import {useState} from 'react'
import draftToHtml from 'draftjs-to-html'
import styles from './create_post.module.scss'
import {useRouter} from 'next/router'
import fs from 'fs'
const TextEditor = dynamic(() => import('../components/TextEditor'), {ssr: false})

export default function EditPost({autofill}) {
    const fromHTML = convertFromHTML(autofill.content)
    const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromBlockArray(fromHTML.contentBlocks, fromHTML.entityMap)))
    const router = useRouter()
    const query = router.query

    const upload_api = async event => {
        event.preventDefault()
        var data = new FormData(event.target)
        data.append('content', draftToHtml(convertToRaw(editorState.getCurrentContent())))
        data.append('name', query.name)
        const response = await fetch('/api/edit', {
            method: 'POST',
            body: data
        })
        router.push(await response.text())
    }

    return (
        <form onSubmit={upload_api} encType='multipart/form-data' autoComplete="off" className={styles.wrapper}>
            <div className={styles.labels_inputs}>
                <div className={styles.labels}>
                    <label htmlFor='title'> Title: </label>
                    <label htmlFor='author'> Author: </label>
                    <label htmlFor='description'> Description: </label>
                    <label htmlFor='thumbnail'> Thumbnail: </label>
                </div>
                <div className={styles.inputs}>
                    <input type='text' name='title' id='title' defaultValue={autofill.frontmatter.title} required/>
                    <input type='text' name='author' id='author' defaultValue={autofill.frontmatter.author} required/>
                    <input type='text' name='description' id='description' defaultValue={autofill.frontmatter.description} required/>
                    <input type='file' name='thumbnail' id='thumbnail' accept='image/*'/>
                </div>
            </div>
            <div className={styles.editor}>
                <TextEditor editorState={editorState} setEditorState={setEditorState}/>
            </div>
            <input type='submit' value='post'/>
        </form>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if(!session || !permissions.admins.includes(session.user.email)) {
        context.res.writeHead(302, {Location: '/unauthorized'})
        context.res.end()
        return {props: {}}
    }
    const autofill = JSON.parse(fs.readFileSync(`./posts/${context.query.name}.json`, 'utf8'))
    return {
        props: {
            user: session.user,
            autofill
        }
    }
}