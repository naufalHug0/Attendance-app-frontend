import { useEffect, useState } from "react"
import bcrypt from 'bcryptjs'

const useHash = (plainText) => {
    const [hash,setHash] = useState('')

    const getHash = () => {
        bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(plainText, salt))
        .then(hash => setHash(hash))
    }

    useEffect(()=>{
        getHash()
    },[plainText])

    return hash
}

export default useHash