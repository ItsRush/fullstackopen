import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getAnecdotes, createAnecdote } from "../requests"
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

 const AnecdoteForm = () => {
  const { notification, notificationDispatch } = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
    },
    onError: () => {
      const errorMsg = error.response.data.message
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    newAnecdoteMutation.mutate({ content, votes: 0})
    notificationDispatch({ type: 'setNotification', payload: `created: ${content}`})
    setTimeout(() => {
      notificationDispatch({ type: 'setNotification', payload: ''})
    }, 5000);
    console.log('new anecdote')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
