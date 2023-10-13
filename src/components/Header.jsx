import React from 'react';
import {FaSearch} from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='bg-red-100'>
        <div className='flex justify-between p-3 max-w-6xl mx-auto'>
        <Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-red-300'>Shoe</span>
            <span className='text-red-500'>Shop</span>
        </h1>
        </Link>
        <form className='bg-red-200 rounded-lg flex items-center px-3 '>
            <input  type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64 ' />
            <FaSearch className='text-red-600'></FaSearch>
        </form>
        <ul className='flex  gap-4'>
            <Link to='/'>
            <li className='hidden sm:inline  hover:underline text-red-700'>Home</li>
            </Link>
            <Link to='/about'>
            <li className='hidden sm:inline  hover:underline text-red-700'>About</li>
            </Link>
            <Link to='/sign-in'>
            <li className=' hover:underline text-red-700'>Sign in</li>
            </Link>
        </ul>
        </div>
    </header>
  )
}
