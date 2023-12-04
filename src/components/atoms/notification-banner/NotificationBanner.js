import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CLOSE_ICON, NOTIF_ICON } from '../../../assets'
import { Message } from '../../../utils'

const NotificationBanner = () => 
{
    const {NOTIF_MESSAGE} = useSelector(state=>state.homeReducer)

    return (
        NOTIF_MESSAGE?.total_unread&&<div className='fixed -top-80 rounded-md max-[350px]:px-4 p-5 max-w-[450px] w-[90%] m-auto left-0 right-0 flex items-center gap-3 z-[999] shadow-default bg-white justify-between cursor-pointer select-none animate-float_in'>
            <a href='/notifications' className='absolute h-full w-[85%] left-0'></a>
            <div className="flex gap-3 sm:gap-5">
                <NOTIF_ICON size={35} color='text-yellow-400'/>
                <div>
                    <p className='font-bold max-[380px]:text-sm'>{NOTIF_MESSAGE.total_unread} Notifikasi belum dibaca</p>
                    <p className='text-slate-300 max-[380px]:text-[10px] text-xs'>Klik untuk melihat</p>
                </div>
            </div>
            <CLOSE_ICON size={20} onClick={()=>Message.dismissNotif()}/>
        </div>
    )
}

export default NotificationBanner