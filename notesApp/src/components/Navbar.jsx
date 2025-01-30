import React from 'react'
import { NavLink } from 'react-router-dom'
import Home from './Home'
import Paste from './Paste'

const Navbar = () => {
  return (
    <div className='flex flex-row gap-4 place-content-evenly'>
      <NavLink
      to={'/'}>
        Home
      </NavLink>

      <NavLink
      to={'/pastes'}>
        Pastes
      </NavLink>
    </div>
  )
}

export default Navbar
