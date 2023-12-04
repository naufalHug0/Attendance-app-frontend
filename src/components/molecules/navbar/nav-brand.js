import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Logo, NOTIF_ICON } from '../../../assets';
import { useFetch, useIsAdmin, useScrollPosition } from '../../../hooks';
import { ProfileImage } from '../../atoms';

const NavBrand = ({
    profile_image,
    unread_notification
}) => {
    const navigate = useNavigate()
    const scrollPos = useScrollPosition()
    const {NOTIF_MESSAGE} = useSelector(state=>state.homeReducer)
    const isAdmin = useIsAdmin()
    
    return (
        <header className={`navbar ${scrollPos>10&&'navbar-shadow'}`}>
            <Logo 
            className='w-32'
            color='red'
            />
            <div className="flex gap-3 items-center">
                {
                    !isAdmin&&<a href='/notifications'><NOTIF_ICON size={20} unread={NOTIF_MESSAGE?.total_unread>0}/></a>
                }
                <ProfileImage
                size='w-10'
                url={profile_image}
                className='cursor-pointer'
                onClick={()=>navigate('profile')}
                />
            </div>
        </header>
    )
}

export default NavBrand