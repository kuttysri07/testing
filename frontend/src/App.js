import React, { Fragment } from 'react'
import Admin from "./components/Admin/Admin"
import Nav from './components/Nav/Nav'
import Card from './components/Card/Card'
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Shoes from './components/Products'

const App = () => {
  return (
   <Fragment>
     
      <BrowserRouter>
        <div>
          <Nav />
          <Routes>
          <Route path="/" element={<Card/>} /> 
            <Route path="/admin" element={<Admin/>} />  
            <Route path="/getimage/:category" element={<Shoes/>} /> 
          </Routes>
        </div>
      </BrowserRouter>
   </Fragment>
  )
}

export default App