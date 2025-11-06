const BlogForm = ({handleCreateBlog, title, setTitle, author, setAuthor, url, setUrl}) => {
    return (
        <div>
            <form onSubmit={handleCreateBlog}>
                <h2>Create a new blog</h2>
                <div>
                    <label>
                    title:
                    <input type="text" value={title} onChange={({target}) => setTitle(target.value)}/>
                    </label>
                </div>
                <div>
                    <label>
                    author:
                    <input type="text" value={author} onChange={({target}) => setAuthor(target.value)}/>
                    </label>
                </div>
                <div>
                    <label>
                    url:
                    <input type="text" value={url} onChange={({target}) => setUrl(target.value)}/>
                    </label>
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default BlogForm;