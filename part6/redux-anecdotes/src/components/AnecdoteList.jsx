import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";

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
    
    return (
        <div>
            {filteredAnecdotes
            .sort((a,b)=>b.votes - a.votes)
            .map(anecdote => (
            <Anecdote 
                key={anecdote.id}
                anecdote={anecdote}
                handleVote={() => dispatch(addVote(anecdote.id))}
            />
            ))}
        </div>
    )
}

export default AnecdoteList; 