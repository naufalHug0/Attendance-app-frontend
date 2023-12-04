import store from '../redux/store'
import {setFlashMessage,setModalMessage, setNotifMessage} from '../redux/action'

class Message {
    static serverError () {
        return store.dispatch(setFlashMessage({
            type: 'danger',
            message: "Internal Server Error"
        }))
    }

    static modal (config) {
        return store.dispatch(setModalMessage(config))
    }

    static dismissModal () {
        return store.dispatch(setModalMessage({}))
    }

    static dismissNotif () {
        return store.dispatch(setNotifMessage({}))
    }

    static dismissFlash () {
        return store.dispatch(setFlashMessage({}))
    }
}

export default Message