export const setUserData = (value) => {
    return {type: "SET_USER_DATA", value}
}

export const setUserAttendance = (value) => {
    return {type: "USER_ATTENDANCE", value}
}

export const setSelectedMonth = (value) => {
    return {type: "SET_SELECTED_MONTH", value}
}

export const setNotifMessage = (value) => {
    return {type: "SET_NOTIF_MESSAGE", value}
}

export const setUserMonthAttendance = (value) => {
    return {type: "SET_USER_MONTH_ATTENDANCE", value}
}