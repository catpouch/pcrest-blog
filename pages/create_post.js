import { getSession } from "next-auth/react"

export default function CreatePost() {
    return (
        <form action='/api/upload' method='post' autoComplete="off">
            <label htmlFor='name'>title:</label><br/>
            <input type='text' name='name' id='name'/><br/>
            <label htmlFor='content'>content:</label><br/>
            <textarea name='content' id='content'/><br/>
            <input type='submit' value='post'/>
        </form>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if(!session) {
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