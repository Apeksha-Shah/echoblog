import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import Home from './pages/home'
import VerifyOTP from './pages/verifyotp'
import CreatePost from './pages/createpost'
import CreateBlog from './pages/createblog'
import BlogDetail from './pages/blogdetail'

function Routing() {
  return (
     <Router>
        <Routes>
            <Route path="/login" element = {<Login/>}></Route>
            <Route path="/register" element = {<Register/>}></Route>
            <Route path='/home' element = {<Home/>}></Route>
            <Route path='/verifyotp' element = {<VerifyOTP/>}></Route>
            <Route path="/create-post" element={<CreatePost/>} />
            <Route path="/create-blog" element = {<CreateBlog/>}></Route>
            <Route path="/blog/:id" element = {<BlogDetail/>}></Route>
        </Routes>
     </Router>
  )
}

export default Routing