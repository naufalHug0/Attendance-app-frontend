import React from 'react'
import { Navbar } from '../../molecules'

const AbsenPageTemplate = ({
    title,
    desc,
    children,
    icon,
    ...rest
}) => {
    return (
        <>
        <Navbar linkTo='/' transparent={true} />
        <div className='h-screen' {...rest}>
            <div className="bg-gradient-to-b w-full h-1/2 from-[#C52A36] to-[#88141D] text-white px-6">
                <div className="relative top-[40px] flex justify-between">
                    <div className='self-end'>
                    <p className='text-4xl font-semibold'>{title}</p>
                    <p className='font-light'>{desc}</p>
                    </div>
                    {icon}
                </div>
            </div>
            <div className="absolute bg-white z-10 rounded-tl-[52px] top-[170px] w-full h-[calc(100vh_-_50px)] min-[350px]:h-[calc(100vh_-_170px)] shadow-[0_-4px_3px_0_rgba(0,0,0,.15)]">{children}</div>
        </div>
        </>
    )
}

export default AbsenPageTemplate