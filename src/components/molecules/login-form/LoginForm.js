import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import {useHash} from '../../../hooks'
import { Button, Input, Link } from '../../atoms'
import {AuthService} from '../../../services'
import { Api } from '../../../utils'

const LoginForm = ({isAdmin}) => {
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [invalid,setInvalid] = useState(false)
    const roleHash = useHash(isAdmin?'1':'0')
    const navigate = useNavigate()

    const handleLoginSuccess = res => {
        AuthService.setLoginSession(res.data.id,res.data.token,roleHash)
        navigate('/')
    }

    const handleLoginFailure = err => {
        if (err.response.status===401) setInvalid(true)
    }

    const login = () => {
        Api.fetchData(
        AuthService.login({
            email,
            password,
            role: isAdmin?'admin':'karyawan'
        }),res=>handleLoginSuccess(res),
        err=>handleLoginFailure(err))
    }

    return (
        <div className='flex justify-center items-center px-3 md:px-10 lg:px-20 flex-col'>
            <p className='mb-14 font-semibold text-3xl text-red-primary first-letter:capitalize'>{isAdmin?'admin':'karyawan'}</p>
            <div className="mb-14 md:mb-20 w-full">
                <Input 
                type="text"
                placeholder="Email"
                className="w-full"
                invalid={{ 
                    isInvalid: invalid,
                    message: 'Invalid email or password'
                }}
                onChange={e=>{
                    setEmail(e.target.value)
                    setInvalid(false)
                }}
                />
                <Input 
                type="password"
                placeholder="Password"
                className="w-full mt-20"
                invalid={{ 
                    isInvalid: invalid,
                    message: 'Invalid email or password'
                }}
                onChange={e=>{
                    setPassword(e.target.value)
                    setInvalid(false)
                }}
                />
            </div>
            <Link 
            href="/auth/forgot"
            className="text-red-primary underline mb-4 text-sm self-start"
            text="Forgot Password?"
            />
            <Button
            text="Masuk"
            className='btn-primary w-full font-normal'
            onClick={login}
            />
            <Link 
            href="/auth"
            className="text-red-primary underline mt-4 text-sm self-start"
            text="Back"
            />
        </div>
    )
}

export default LoginForm