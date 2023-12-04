import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSelectedMonth } from '../../../redux/action'

const DateSelect = ({
    title,
    className,
    type='text',
    getValue,
    getUncontrolledValue,
    invalid,
    ...rest
}) => 
{
    const dispatch = useDispatch()
    const [error,setError] = useState(invalid)
    useEffect(()=>setError(invalid),[invalid])

    return (
        <input {...rest} id='' ref={e=>getUncontrolledValue&&getUncontrolledValue(e?.value)} onChange={e=>{
            dispatch(setSelectedMonth(e.target.value))
            if(getValue) getValue(e.target.value)
            setError(false)
        }} type={type} placeholder={title} onFocus={(e) => e.target.type = type=='month'?type:'date'} className={`px-3 py-2 font-semibold text-sm ${error?'shadow-error':'shadow-default'} rounded-md border-r-8 border-r-transparent placeholder:text-black ${className}`}/>
    )
}

export default DateSelect