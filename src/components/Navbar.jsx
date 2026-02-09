import React from 'react'

const Navbar = () => {
  return (
    <div className='z-10 bg-gray-800 w-full flex items-center justify-between md:justify-evenly px-6 text-white py-2 h-[7.5vh] min-h-fit sticky top-0'>
      <div className="passop font-bold text-2xl text-green-600">&lt;<span className='text-white'>Pass</span><span className='text-green-600'>/OP</span>&gt;</div>
      <div className="github"><a href="https://github.com/piyushmauryacodes" className='ring-gray-400 ring flex gap-4 font-bold bg-green-800 p-2 rounded-full rounded-2xl px-2 md:px-4'><img src="src\assets\github-logo-6532.svg" alt="" className='invert w-6' /> <span className='hidden md:block'>GitHub</span></a></div>
    </div>
  )
}

export default Navbar
