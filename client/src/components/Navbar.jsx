import React from 'react'
import { NavLink } from 'react-router'

const navbar = ['home','about','contact']
function Layout() {
  return (
    <nav className='flex gap-4'>
        {
            navbar.map((item,i)=>(
                <NavLink key={i} to={item === 'home'? '/' : `/${item.toLowerCase()}`} className={( {isActive})=>isActive? 'text-red-500' : ''}>{item}</NavLink>
            ))
        }
    </nav>
  )
}

export default Layout