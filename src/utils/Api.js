import Message from "./Message"

class Api {
    static fetchData (promise,handleFulfilled=()=>null,handleRejected=()=>null) {
        promise.then(res=>{
            handleFulfilled(res.data)
        })
        .catch(err=>{
            if (err.response.status===500) return Message.serverError()
            handleRejected(err)
        })
    }
}

export default Api