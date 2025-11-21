import { useDispatch, useSelector } from "react-redux";
import { addVotes } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer"
import { clearNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleVote }) =>{
    return (
        <div>
            <div>{anecdote.content}</div>
            <div>
                {anecdote.votes}
                <button onClick={handleVote}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state=>state.anecdotes)
    const anecdoteFilter = useSelector(state => state.filter)

    const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(anecdoteFilter))
    
    const handleVote = (anecdote) => {
        dispatch(addVotes(anecdote.id))
        dispatch(setNotification(`You voted for '${anecdote.content}'`))

        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000);
    }
    return (
        <div>
            {filteredAnecdotes
            .sort((a,b)=>b.votes - a.votes)
            .map(anecdote => (
            <Anecdote 
                key={anecdote.id}
                anecdote={anecdote}
                handleVote={() => handleVote(anecdote)}
            />
            ))}
        </div>
    )
}

export default AnecdoteList; 