import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes } from './requests'
import { addVote } from './requests'
import { useContext } from 'react'
import NotificationContext from "../src/NotificationContext"

const App = () => {
  const { notificationDispatch } = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const newVoteMutation = useMutation({
    mutationFn: addVote,

    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
    }
  })
  const handleVote = (anecdote) => {
    newVoteMutation.mutate(anecdote.id)
    notificationDispatch({ type: 'voteAnecdote', payload: anecdote.content})
        setTimeout(() => {
      notificationDispatch({ type: 'clearNotification'})
    }, 5000);
    console.log('vote', anecdote.id)
  }

  const {data:result,isLoading, isError, error} = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
  
  if(isError) {
    return <span>Error: {error.message}</span>
  }

  if(isLoading) {
    return <div>loading data...</div>
  }

  const anecdotes = result

  console.log(anecdotes)
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
