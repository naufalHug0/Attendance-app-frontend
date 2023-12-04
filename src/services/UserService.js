import axios from "axios"

class UserService {
    static baseUrl = 'http://enkripa.test/api'

    static async getUser (params, headers=null) {
        // params : id, rle_id
        const response = await axios.get(`${this.baseUrl}/karyawan/${params.id}`,{headers,params})

        return response
    }
}

export default UserService