import axios from "axios"

class AdminService {
    static baseUrl = 'http://enkripa.test/api'

    static async getAllKaryawan () {
        const response = await axios.get(`${this.baseUrl}/admin/karyawan/all`)
        return response
    }

    static async getAllAttendanceCount () {
        const response = await axios.get(`${this.baseUrl}/admin/karyawan/attendance/all`)

        return response
    }

    static async getAllNotifications () {
        const response = await axios.get(`${this.baseUrl}/notification/admin`)

        return response
    }

    static async isAdmin (id) {
        const response = await axios.get(`${this.baseUrl}/admin/${id}`)

        return response
    }
}

export default AdminService