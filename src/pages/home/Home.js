import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { AdminPageTemplate, KaryawanPageTemplate, NotificationBanner, SkeletonLoader } from '../../components'
import { useAuthAdmin, useFetch } from '../../hooks'
import { AuthService, UserService } from '../../services'
import { ReduxDispatcher } from '../../utils'
import Wfo from '../Absen/Wfo/Wfo'

const Home = () => {
    const isAuthenticated = sessionStorage.getItem('e_id')!==null

    const isAdmin = useAuthAdmin()

    const handleUserData = res => {
        const total_unread = res.data.unread_notifications
        const unreadMessagesExist = total_unread>0

        ReduxDispatcher.userData(res.data)

        if (unreadMessagesExist) {
            ReduxDispatcher.notifMessage({total_unread})
        }
    }

    const handleUnauthorized = err => {
        if (err.response.status===404||err.response.status===498) return AuthService.logout()
    }

    const { loading } = useFetch(UserService.getUser({
        id: sessionStorage.getItem('e_id'),
        rle_id: isAdmin ? 1 : 0
    }),
    handleUserData,handleUnauthorized)

    if (!isAuthenticated) return <Navigate to='/auth'/>

    if (loading) return <SkeletonLoader/>

    return (
        <Routes>
            <Route path='/' element={
                <>
                <NotificationBanner/>
                {
                    isAdmin?<AdminPageTemplate/>:<KaryawanPageTemplate/>
                }
                </>
            }></Route>
            <Route path='*' element={
                isAdmin?<AdminPageRoutes/>:<KaryawanPageRoutes/>
            }></Route>
        </Routes>
    )
}

const KaryawanPageRoutes = () => (
    <Routes>
        <Route path='/wfo' element={<Wfo/>}
        ></Route>
        <Route path='/wfa' element={''}></Route>
        <Route path='/wfh' element={''}></Route>
        <Route path='/cuti' element={''}></Route>
        <Route path='/sakit' element={''}></Route>
    </Routes>
)

const AdminPageRoutes = () => (
    <></>
)

export default Home