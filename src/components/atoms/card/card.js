import React from 'react'
import { LIST_ICON } from '../../../assets'

const Card = ({
    icon,
    iconBgColor,
    title,
    days,
    href,
    ...rest
}) => {
    return (
        <a href={href} {...rest} className='shadow-default rounded-lg flex justify-between px-5 py-10'>
            <div className="grid grid-cols-[repeat(2,max-content)] gap-3 min-[350px]:gap-5 items-center">
            <div className={`flex rounded-full justify-center items-center w-16 aspect-square ${iconBgColor}`}>{icon}</div>
                <div>
                    <p className="font-semibold sm:heading">{title}</p>
                    <p className='text-slate-400 text-xs'>{days} Hari</p>
                </div>
            </div>
        </a>
    )
}

export default Card