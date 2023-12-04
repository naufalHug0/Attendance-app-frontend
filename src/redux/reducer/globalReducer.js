const initialState = {
    FLASH_MESSAGE:{},
    MODAL_MESSAGE:{},
}

const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_FLASH_MESSAGE" :
            return {...state, FLASH_MESSAGE: action.value}
        case "SET_MODAL_MESSAGE" :
            return {...state, MODAL_MESSAGE: action.value}
        default: 
            
    }

    return state;
}

export default globalReducer;