import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url,setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [errorMsg,setErrorMsg] = useState(null)
  const [successMsg,setSuccessMsg] = useState(null)

  // --->Use Effect Start<------
  useEffect(() => {
    const fetchData = async () => {

      blogService.getToken(user.token)
      const blogs = await blogService.getAll()
      console.log(blogs);
      setBlogs(blogs)
    }
    if (user && user.token) {
      fetchData();
    }


  }, [user])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('token'))
    if (user) {
      setUser(user)
    }
  }, [])
  // --->Use Effect End<------

  // --->handles Start<------
  const handleLogin = async (event) => {
    event.preventDefault()
    const loginObject = { username, password }
    try {
      const user = await loginService.login(loginObject)
      console.log(user);
      setUser(user)
      setUsername('')
      setPassword('')
      localStorage.setItem('token', JSON.stringify(user))
      setSuccessMsg(`Login Successful`)
      setTimeout(()=>setSuccessMsg(null),4000)
    } catch (err) {
      setErrorMsg('Username or Password incorrect ')
      setTimeout(()=>setErrorMsg(null),4000)
    }

  }

  const handleLogout = ()=>{
    localStorage.removeItem('token')
    setUser(null)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const createBlogObj = {title,author,url}
    try{
      await blogService.createNewBlog(createBlogObj)
      setTitle('')
      setAuthor('')
      setUrl('')
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      setSuccessMsg(`a new blog ${title} by ${author} added`)
      setTimeout(()=>setSuccessMsg(null),4000)
    }catch(err){   
      setErrorMsg('A new blog is not added ')
      setTimeout(()=>setErrorMsg(null),4000)
      }
  }
  // --->handles End<------


  // --->Blog Render Start<------
  const loginBlogRender = () => {
    if (user === null) {
      return (
        <div>
          <h2>Log in to application</h2>
          <form onSubmit={handleLogin}>
            <div>
              <input value={username} onChange={({ target }) => setUsername(target.value)} type='text' placeholder='Enter User Name' />
            </div>
            <div>
              <input value={password} onChange={({ target }) => setPassword(target.value)} type='text' placeholder='Enter password' />
            </div>
            <button type='submit'>Login</button>
          </form>
        </div>
      )
    }

    return (
      <div>
        <h2>blogs</h2>
        
        <div>
          {user.name} logged in
          <button onClick={handleLogout}>Logout</button>
        </div>
        <br />
        <h2>Create new Blog</h2>
        <form onSubmit={handleCreateBlog}>
          <div>
            <input value={title} onChange={({ target }) => setTitle(target.value)} type='text' placeholder='Enter title' />
          </div>
          <div>
            <input value={author} onChange={({ target }) => setAuthor(target.value)} type='text' placeholder='Enter Author' />
          </div>
          <div>
              <input value={url} onChange={({ target }) => setUrl(target.value)} type='text' placeholder='Enter URL' />
            </div>
            <button type='submit'>Create</button>
        </form>
        <br/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
 // --->Blog Render End<------

  return (
    <div>
      {(errorMsg || successMsg) && (
          <Notification errorMsg={errorMsg} successMsg={successMsg}/>
        )}
      {loginBlogRender()}
    </div>
  )
}

export default App