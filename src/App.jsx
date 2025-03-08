import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home';

const App = () => {
  return (
    <div className='bg-green-100 container mx-auto'>
      <Routes>
       <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App