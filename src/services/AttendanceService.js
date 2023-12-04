import axios from "axios"

export default class AttendanceService {
    static baseUrl = 'http://enkripa.test/api'

    static async setAbsen (data) {
        // data : id, type, IN, overtime=false
        const response = await axios.post(`${this.baseUrl}/absen/`,data)

        return response
    }

    static async wfoIn (id) {
        const response = await axios.post(`${this.baseUrl}/absen/`,{
            id,
            type: 'wfo',
            IN: true
        })

        return response
    }

    static async wfoOut (id) {
        const response = await axios.post(`${this.baseUrl}/absen/`,{
            id,
            type: 'wfo',
            IN: false
        })

        return response
    }

    static async wfhOut (id) {
        const response = await axios.post(`${this.baseUrl}/absen/`,{
            id,
            type: 'wfh',
            IN: false
        })

        return response
    }

    static async wfaIn (id) {
        const response = await axios.post(`${this.baseUrl}/absen/`,{
            id,
            type: 'wfa',
            IN: true
        })

        return response
    }

    static async wfaOut (id, lembur) {
        const response = await axios.post(`${this.baseUrl}/absen/`,{
            id,
            type: 'wfa',
            IN: false,
            overtime: lembur
        })

        return response
    }

    static async lemburStart (id) {
        const response = await axios.post(`${this.baseUrl}/absen/`,{
            id,
            type: 'lembur',
            IN: true
        })

        return response
    }

    static async lemburEnd (id) {
        const response = await axios.post(`${this.baseUrl}/absen/`,{
            id,
            type: 'lembur',
            IN: true
        })

        return response
    }

    static async getAbsensiToday (params) {
        // params :id,status=wfo
        const response = await axios.get(`${this.baseUrl}/absen/today/`,{params})

        return response
    }

    static async getAbsensiMonth (params) {
        // params : id, month, year
        const response = await axios.get(`${this.baseUrl}/absen/month`,{params})

        return response
    }

    static async getWorkingHours (params) {
        const response = await axios.get(`${this.baseUrl}/absen/working-hours`,{params})

        return response
    }

    static async getCuti (params) {
        // params : id
        const response = await axios.get(`http://enkripa.test/api/request/cuti/`,{params})
        
        return response
    }

    static async getWFA (id) {
        const response = await axios.get(`http://enkripa.test/api/request/wfa/${id}`)
        
        return response
    }

    static async getWfh (id) 
    {
        const response = await axios.get(`http://enkripa.test/api/request/wfh/${id}`)
        
        return response
    }

    static async getSakit (id) 
    {
        const response = await axios.get(`http://enkripa.test/api/request/sakit/${id}`)
        
        return response
    }

    static async postRequestCuti (data) {
        // data : {id, start, end, type, desc}
        const response = await axios.post(`${this.baseUrl}/request/cuti`,data)

        return response
    }

    static async postRequestSakit (data) {
        const response = await axios.post(`${this.baseUrl}/request/sakit`,data,{
            headers: {
                "content-type": "multipart/form-data"
            }
        })
    
        return response
    }

    static async postRequestWfa (data) {
        const response = await axios.post(`${this.baseUrl}/request/wfa`,data,{
            headers: {
                "content-type": "multipart/form-data"
            }
        })
    
        return response
    }

    static async postRequestWfh (data) {
        // data : id
        const response = await axios.post(`${this.baseUrl}/request/wfh`,data)

        return response
    }

    static async uploadSuratSakit (data) {
        const response = await axios.post(`${this.baseUrl}/request/sakit/upload`,data,{
            headers: {
                "content-type": "multipart/form-data"
            }
        })

        return response
    }

    static async checkHaventCheckout (params) {
        // params: id
        const response = await axios.get(`http://enkripa.test/api/absen/yesterday/`,{params})
        
        return response
    }
}