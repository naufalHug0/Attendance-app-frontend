import React, { useState } from 'react'
import { AuthService } from '../../../services'
import { Api, Message } from '../../../utils'
import { Button, Input, Link } from '../../atoms'
import { MODAL_MESSAGE, MODAL_OPTIONS } from '../../../constant'

const ForgotPassForm = () => {
    const [email,setEmail] = useState()
    const [invalid,setInvalid] = useState(false)

    const handleSubmitSuccess = () => {
        Message.modal({
            ...MODAL_MESSAGE.SENT_FORGOT_PASSWORD,
            options:[
                {
                    ...MODAL_OPTIONS.LANJUT,
                    url:'/auth'
                }
            ]
        })
    }

    const handleSubmitFailure = (err) => {
        if (err.response.status===404) setInvalid(true)
    }

    const onSubmit = () => {
        Api.fetchData(
        AuthService.forgotPassword({email}),
        handleSubmitSuccess,
        err=>handleSubmitFailure(err))
    }

    return (
        <div className='flex justify-center items-center px-3 md:px-10 lg:px-20 flex-col'>
            <p className='mb-14 font-semibold text-3xl text-red-primary'>Forgot Password</p>
            <Input 
            type="text"
            placeholder="Email"
            className="w-full"
            invalid={{ 
                isInvalid: invalid,
                message: 'Email tidak ditemukan'
            }}
            onChange={e=>{
                setEmail(e.target.value)
                setInvalid(false)
            }}
            />
            <Button
            text="Lanjut"
            className='btn-primary w-full font-normal mt-8'
            onClick={onSubmit}
            />
            <Link 
            href='/auth'
            className="text-red-primary underline mt-4 text-sm self-start"
            text="Back"
            />
        </div>
    )
}

export default ForgotPassForm