import { useDispatch } from "react-redux";

import { notificationDuration } from '../reducers/notificationReducer'


import { appendAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(appendAnecdote(content))
        dispatch(notificationDuration(`Created a new anecdote: '${content}'`,3000))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name='anecdote'/>
                </div>
                <button type='submit'>create</button>
            </form>
        </div>

    )
}

export default AnecdoteForm