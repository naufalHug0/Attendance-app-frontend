import React, {useState, useEffect} from "react"
import Message from "../utils/Message";

const useFetch = (promise,handleFulfilled=()=>null,handleRejected=()=>null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        promise.then(res=>{
            setData(res.data?.data)
            handleFulfilled(res.data)
            setLoading(false)
        })
        .catch(err=>{
            setError(err.response)
            if (err.response.status===500) return Message.serverError()
            handleRejected(err)
        })
    },[])

    return {
        data,
        loading,
        error
    }
}

export default useFetch