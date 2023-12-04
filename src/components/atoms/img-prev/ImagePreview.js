import React from 'react'
import { CLOSE_ICON } from '../../../assets'

const ImagePreview = ({ url, show }) => (
    <div className="fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 animate-overlay flex justify-center items-center p-8"  onClick={()=>show(false)}>
        <div className="text-white flex flex-col gap-3 animate-modal ">
            <div className="self-end cursor-pointer relative z-[999]">
                <CLOSE_ICON size={30} onClick={()=>show(false)}/>
            </div>
            <img src={url} className='w-[90%] sm:w-[500px]'/>
        </div>
    </div>
)

export default ImagePreview