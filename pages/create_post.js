import { getSession } from "next-auth/react"
import permissions from '../user_permissions.json'
import dynamic from "next/dynamic"
import {EditorState, convertToRaw} from 'draft-js'
import {useState} from 'react'
import draftToHtml from 'draftjs-to-html'
const TextEditor = dynamic(() => import('../components/TextEditor'), {ssr: false})

export default function CreatePost() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const upload_api = async event => {
        event.preventDefault()
        var data = new FormData(event.target)
        data.append('content', draftToHtml(convertToRaw(editorState.getCurrentContent())))
        await fetch('/api/upload', {
            method: 'POST',
            body: data
        })
        console.log('balls')
    }

    return (
        <form onSubmit={upload_api} encType='multipart/form-data' autoComplete="off">
            {/* IMPORTANT: MAKE ALL OF THESE REQUIRED */}
            <label htmlFor='title'> title: </label><br/>
            <input type='text' name='title' id='title'/><br/>

            <label htmlFor='author'> author: </label><br/>
            <input type='text' name='author' id='author'/><br/>

            <label htmlFor='description'> description: </label><br/>
            <input type='text' name='description' id='description'/><br/>

            <label htmlFor='thumbnail'> thumbnail: </label><br/>
            <input type='file' name='thumbnail' id='thumbnail' accept='image/*'/><br/>

            <label htmlFor='images'> images: </label><br/>
            <input type='file' name='images' id='images' accept='image/*' multiple/><br/>

            <TextEditor editorState={editorState} setEditorState={setEditorState}/>

            <input type='submit' value='post'/>
        </form>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if(!session || !permissions.admins.includes(session.user.email)) {
        context.res.writeHead(302, {Location: '/'})
        context.res.end()
        return {props: {}}
    }
    return {
        props: {
            user: session.user
        }
    }
}