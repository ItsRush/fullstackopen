import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'createAnecdote':
            return {
                message: `created: '${action.payload}'`,
                duration: 5000
            }
        case 'voteAnecdote':
            return {
                message: `anecdote '${action.payload}' voted`,
                duration: 5000
            }
        case 'clearNotification':
            return ''
        default:
            return state
    }
}
const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value = {{ notification, notificationDispatch }}>
            {props.children}
        </NotificationContext.Provider>
    )
}
export default NotificationContext