import { useState } from 'react'
import Join from './component/join'
import Chat from './component/chat';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from "react-router-dom";



function App() {

  return (
    
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Chat/>}/>
    <Route path='/chat'element={<Chat/>}/>

    </Routes>
    
    </BrowserRouter>
 

     
    
    </>
  )
}

export default App
