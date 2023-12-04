import React from 'react'
import { useSelector } from 'react-redux'
import { Message } from '../../../utils'

const ModalMessage = () => {
    const {MODAL_MESSAGE} = useSelector(state=>state.globalReducer)

    return (
        Object.keys(MODAL_MESSAGE).length>0&&<div class='fixed z-[999] bg-opacity-30 bg-black top-0 left-0 right-0 bottom-0 flex justify-center items-center animate-overlay'>
        <div class='w-[90%] sm:w-[600px] bg-white rounded-lg box-border px-6 sm:px-8 py-7 animate-modal'>
        <p class="text-xl sm:text-2xl text-black mb-2">{MODAL_MESSAGE.title}</p>
        <p class="font-light text-xs sm:text-sm text-slate-500 mb-5">{MODAL_MESSAGE.body}</p>
        <div class="flex gap-3">
            {
            MODAL_MESSAGE.options.map(option=>option?.url?<a href={option.url} class={`btn text-sm ${option.type}`}>{option.body}</a>:<div className={`btn ${option.type} cursor-pointer text-sm`} onClick={()=>{
                Message.dismissModal()
                option?.action()
            }}>{option.body}</div>)
            }
        </div>
        </div>
    </div>
    )
}

export default ModalMessage