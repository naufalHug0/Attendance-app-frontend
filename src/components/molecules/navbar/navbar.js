import React from 'react'
import { useNavigate } from 'react-router'
import { LEFTARROW_ICON } from '../../../assets'
import { useScrollPosition } from '../../../hooks'

const Navbar = ({linkTo,transparent}) => {
    const navigate = useNavigate()
    const scrollPos = useScrollPosition()

    return (
        <header className={`navbar ${scrollPos<10&&transparent?'':'navbar-shadow'} h-[52px]`}>
            <LEFTARROW_ICON
            color={scrollPos<10&&transparent?'text-white':'text-black'}
            size={20}
            onClick={()=>navigate(linkTo)}
            />
        </header>
    )
}

export default Navbar