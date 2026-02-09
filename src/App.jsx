import { useState } from 'react'
import Navbar from './components/Navbar'
import Manger from './components/Manger'
import Footer from './components/Footer'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <Navbar/>
      <Manger/>
      <Footer/>
    </div>
    </>
  )
}

export default App
