import axios from "axios"
import { Navigate } from "react-router"
import bcrypt from 'bcryptjs'

export default class AuthService {
    static baseUrl = 'http://enkripa.test/api'

    static async login (data) {
        // data : {email,password,role:section}
        const response = await axios.post(`${this.baseUrl}/auth/login`,data)

        return response
    }

    static logout () {
        sessionStorage.clear()
        return <Navigate to='/auth'/>
    }

    static setLoginSession(id,token,role_id) {
        sessionStorage.setItem('e_id',id)
        sessionStorage.setItem('token',token)
        sessionStorage.setItem('rle_id',role_id)
    }

    static async forgotPassword (params) {
        // params : {email}
        const response = await axios.post(`${this.baseUrl}/auth/forgot`,{params})

        return response
    }

    static validateRoleId () {
        return bcrypt.compareSync('1', sessionStorage.getItem('rle_id'))
    }
}