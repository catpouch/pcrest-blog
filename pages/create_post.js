import { getSession } from "next-auth/react"
import permissions from '../user_permissions.json'

export default function CreatePost() {
    /*const upload_api = async event => {
        event.preventDefault()
        await fetch(`api/upload`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: new FormData(event.target)
        })
    }*/

    return (
        <form action='api/upload' method='post' encType='multipart/form-data' autoComplete="off">
            <label htmlFor='title'> title: </label><br/>
            <input type='text' name='title' id='title'/><br/>

            <label htmlFor='author'> author: </label><br/>
            <input type='text' name='author' id='author'/><br/>

            <label htmlFor='description'> description: </label><br/>
            <input type='text' name='description' id='description'/><br/>

            <label htmlFor='thumbnail'> thumbnail: </label><br/>
            <input type='file' name='thumbnail' id='thumbnail' accept='image/*'/><br/>

            <label htmlFor='content'> content: </label><br/>
            <textarea name='content' id='content'/><br/>

            <label htmlFor='images'> images: </label><br/>
            <input type='file' name='images' id='images' accept='image/*' multiple/><br/>

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