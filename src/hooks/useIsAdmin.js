import React, { useEffect, useState } from 'react'
import { AuthService } from '../services'

const useIsAdmin = () => {
    const [isAdmin,setIsAdmin] = useState(false)

    useEffect(()=>{
        setIsAdmin(AuthService.validateRoleId())
    },[isAdmin])

    return isAdmin
}

export default useIsAdmin