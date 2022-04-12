import { getSession } from "next-auth/react"
import permissions from '../user_permissions.json'
import dynamic from "next/dynamic"
import {EditorState, ContentState, convertToRaw, convertFromHTML} from 'draft-js'
import {useState} from 'react'
import draftToHtml from 'draftjs-to-html'
import styles from './create_post.module.scss'
import {useRouter} from 'next/router'
import data from '../staff_info.json'
const TextEditor = dynamic(() => import('../components/TextEditor'), {ssr: false})

export default function EditStaff({autofill}) {
    //const fromHTML = convertFromHTML(autofill.description)
    const fromHTML = null
    //const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromBlockArray(fromHTML.contentBlocks, fromHTML.entityMap)))
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const router = useRouter()

    const upload_api = async event => {
        event.preventDefault()
        var data = new FormData()
        data.append('description', draftToHtml(convertToRaw(editorState.getCurrentContent())).replace(/(\r\n|\n|\r)/gm, ''))
        console.log(data.get('description'))
        await fetch('/api/edit_staff', {
            method: 'POST',
            body: data
        })
        router.push('/journalism_staff')
    }

    return (
        <form onSubmit={upload_api} encType='multipart/form-data' autoComplete="off" className={styles.wrapper}>
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
    return {
        props: {
            user: session.user,
            autofill: data
        }
    }
}