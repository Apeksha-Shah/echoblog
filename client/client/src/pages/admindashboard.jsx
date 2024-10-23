import React from 'react'
import Header from "./Header";
import AdminHome from './adminHome';

const Admindashboard = () => {
  return (
    <>
        <Header isAdmin = {true}/>
        <AdminHome/>
    </>
  )
}

export default Admindashboard