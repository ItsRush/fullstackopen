const notificationReducer = (state = null, action) => {
    switch(action.type) {
        case 'success':
            return {
                message: action.payload,
                type: 'success',
                duration: 5000
            }
        case 'error':
            return {
                message: action.payload,
                type: 'error',
                duration: 5000
            }
        case 'clear':
            return ''
        default:
            return state
    }
}

export const setError = (text) => {
    return {
        type: 'error',
        payload: text
    }
}

export const setSuccess = (text) => {
    return {
        type: 'success',
        payload: text
    }
}
export const setClear = (text) => {
    return {
        type: 'clear'
    }
}

export default notificationReducer