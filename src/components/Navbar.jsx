import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-gradient-to-r from-sky-700 to-sky-800/90 text-white p-4 shadow-lg rounded-b-sm backdrop-blur">
        <div className="text-2xl font-extrabold tracking-wide mx-4">
            <span className=''>iTask</span>
        </div>
      <ul className="flex flex-wrap gap-6 mx-4">
        <li>
          <a href="/" className="hover:text-orange-400 hover:underline underline-offset-4 font-semibold duration-300 transition">Home</a>
        </li>
        <li>
          <a href="/#" className="hover:text-orange-400 hover:underline underline-offset-4 font-semibold duration-300 transition">Your Tasks</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
