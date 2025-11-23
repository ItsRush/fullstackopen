import { useDispatch, useSelector } from "react-redux";
import { notificationDuration } from "../reducers/notificationReducer"
import { voteForAnecdote } from "../reducers/anecdoteReducer";

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

    const filteredAnecdotes = anecdotes.filter(anecdote => {
        if(!anecdoteFilter) return true
        if(!anecdote.content) return false
        anecdote.content.toLowerCase().includes(anecdoteFilter)
    })
    
    const handleVote = (anecdote) => {
        dispatch(voteForAnecdote(anecdote.id))
        dispatch(notificationDuration(`You voted for '${anecdote.content}'`, 3000))
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