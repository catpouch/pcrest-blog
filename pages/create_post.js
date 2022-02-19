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