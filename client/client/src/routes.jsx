import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'

function Routing() {
  return (
     <Router>
        <Routes>
            <Route path="/login" element = {<Login/>}></Route>
            <Route path="/register" element = {<Register/>}></Route>
        </Routes>
     </Router>
  )
}

export default Routing