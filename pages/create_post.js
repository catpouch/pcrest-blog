import { getSession } from "next-auth/react"
import permissions from '../user_permissions.json'

export default function CreatePost() {
    return (
        <form action='/api/upload' method='post' autoComplete="off">
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

            <input type='submit' value='post'/>
        </form>
    )
}

/*
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
}*/