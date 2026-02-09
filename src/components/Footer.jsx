import React from 'react'

const Footer = () => {
    return (
        <div className='bg-gray-800 w-full flex flex-col items-center justify-evenly  h-[7.5vh] px-6 text-white py-2 min-h-fit'>
            <div className="passop font-bold text-xl text-green-600">&lt;<span className='text-white'>Pass</span> <span className='text-green-600'>/OP</span>&gt;</div>
            <div className="message">Made with ❤️ by Piyush Maurya</div>
        </div>
    )
}

export default Footer
