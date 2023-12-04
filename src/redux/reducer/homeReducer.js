const initialState = {
    USER_DATA:{},
    NOTIF_MESSAGE:{},
    USER_ATTENDANCE:{},
    USER_MONTH_ATTENDANCE:{},
    SELECTED_MONTH:new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2),
}

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER_DATA" :
            return {...state, USER_DATA: action.value}
        case "SET_USER_ATTENDANCE" :
            return {...state, USER_ATTENDANCE: action.value}
        case "SET_USER_MONTH_ATTENDANCE" :
            return {...state, USER_MONTH_ATTENDANCE: action.value}
        case "SET_SELECTED_MONTH" :
            return {...state, SELECTED_MONTH: action.value}
        case "SET_NOTIF_MESSAGE" :
            return {...state, NOTIF_MESSAGE: action.value}
        default: 
            
    }

    return state;
}

export default homeReducer;