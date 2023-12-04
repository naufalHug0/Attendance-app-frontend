import store from "../redux/store"
import { setNotifMessage, setSelectedMonth, setUserAttendance, setUserData, setUserMonthAttendance } from "../redux/action"

class ReduxDispatcher {
    static userData (value) {
        return store.dispatch(setUserData(value))
    }

    static userAttendance (value) {
        return store.dispatch(setUserAttendance(value))
    }

    static userMonthAttendance (value) {
        return store.dispatch(setUserMonthAttendance(value))
    }

    static selectedMonth (value) {
        return store.dispatch(setSelectedMonth(value))
    }

    static notifMessage (value) {
        return store.dispatch(setNotifMessage(value))
    }
}

export default ReduxDispatcher