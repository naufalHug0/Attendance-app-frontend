import React from 'react'
import { useSelector } from 'react-redux'
import { CLOSE_ICON } from '../../../assets'
import { Message } from '../../../utils'

const FlashMessage = () => {
    const {FLASH_MESSAGE} = useSelector(state=>state.globalReducer)
    
    return (
        FLASH_MESSAGE?.type&&<div className={`fixed top-3 rounded-md px-5 py-4 max-w-[450px] w-[90%] success m-auto left-0 right-0 ${FLASH_MESSAGE.type} flex justify-between items-center animate-modal z-[999]`}>
            <p>{FLASH_MESSAGE.message}</p>
            <CLOSE_ICON
            size={15}
            onClick={()=>Message.dismissFlash()}
            />
        </div>
    )
}

export default FlashMessage