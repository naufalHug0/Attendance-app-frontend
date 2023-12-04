import React from 'react'

const NOTIF_ICON = ({
    size,
    className,
    unread,
    ...rest
}) => (
    <div className='relative h-max'>
    <svg xmlns="http://www.w3.org/2000/svg" {...rest} width={size} fill="currentColor" class={`bi bi-bell-fill ${className}`} viewBox="0 0 16 16">
    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
    </svg>
    {unread&&<span className="absolute w-2 aspect-square bg-red-500 rounded-full top-0 right-0"></span>}
    </div>
)

export default NOTIF_ICON