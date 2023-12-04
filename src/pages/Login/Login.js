import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { Logo } from '../../assets'
import { LoginForm, ForgotPassForm, Link } from '../../components'

const Login = () => {
    const isAuthenticated = sessionStorage.getItem('e_id')!==null

    if (isAuthenticated) return <Navigate to='/' />

    return (
        <div className='auth-page'>
            <LoginLogo/>
            <Routes>
                <Route path='/' element={<LoginOption/>} />

                <Route path='/karyawan' element={<LoginForm isAdmin={false}/>} />

                <Route path='/admin' element={<LoginForm isAdmin={true}/>} />

                <Route path='/forgot' element={<ForgotPassForm/>}/>
            </Routes>
        </div>
    )
}

const LoginLogo = () => <div className="bg-red-primary col-start-1 hidden lg:flex justify-center items-center">
<Logo
className="w-80"
color="white"
/>
</div>

const LoginOption = () => (
    <div className='flex flex-col justify-center gap-10 items-center h-full lg:col-start-2'>
        <div className="lg:hidden">
        <Logo
        className="w-56"
        color="red"
        />
        </div>
        <div className='flex flex-col gap-3 w-full lg:h-screen lg:p-12 lg:justify-center'>
            <Link
            href='/auth/karyawan'
            text="Masuk sebagai karyawan"
            className="btn btn-primary font-normal w-full py-4"
            />
            <Link
            href='/auth/admin'
            text="Masuk sebagai admin"
            className="btn btn-sec font-normal w-full py-4"
            />
        </div> 
    </div>
)

export default Login