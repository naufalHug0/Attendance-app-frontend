import { useEffect, useState } from 'react'
import bcrypt from 'bcryptjs'
import { AdminService, AuthService } from '../services'
import { Message } from '../utils'

const useAuthAdmin = () => {
    const [isAdmin,setIsAdmin] = useState()
    const isAuthenticated = sessionStorage.getItem('e_id')!==null

    useEffect(()=>{
        if (isAuthenticated) 
        {
            validateToken()
            .then(authorized=>{
                if (authorized)
                {
                    validateRoleId()
                    .then(admin => {
                        checkIsAdmin()
                        .then(()=>setIsAdmin(admin))
                        .catch(err=>{
                            if (err.response.status===404)
                            {
                                setRoleIdToKaryawan()
                                setIsAdmin(false)
                            } 
                            if (err.response.status===500) {
                                Message.serverError()
                            }
                        })
                    })
                } else {
                    AuthService.logout()
                }
            })
        }
    },[isAuthenticated])

    return isAdmin
}

const validateToken = () => bcrypt.compare(sessionStorage.getItem('e_id'),sessionStorage.getItem('token'))

const validateRoleId = () => bcrypt.compare('1', sessionStorage.getItem('rle_id'))

const checkIsAdmin = async () => {
    const response = await AdminService.isAdmin(sessionStorage.getItem('e_id'))

    return response
}

const setRoleIdToKaryawan = () => bcrypt.genSalt(10).then(salt => bcrypt.hash('0', salt)).then(hash => sessionStorage.setItem('rle_id',hash))

export default useAuthAdmin