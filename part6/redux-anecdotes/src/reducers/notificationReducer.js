import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action){
            return action.payload
        },
        clearNotification(state, action){
            return ''
        }
    }
})

const {setNotification, clearNotification } = notificationSlice.actions

export const notificationDuration = ( message, duration = 5000) => {
    return async (dispatch) => {
        dispatch(setNotification(message))

        setTimeout(() => {
            dispatch(clearNotification())
        },duration)
    }
}

export default notificationSlice.reducer