import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push( action.payload )
  },
    addVotes(state, action) {
      const votedAnecdote = action.payload
      return state.map(anecdote => anecdote.id === votedAnecdote.id ? votedAnecdote : anecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  }
    
})

const { createAnecdote, setAnecdotes, addVotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const voteForAnecdote = (id) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.vote(id)
    dispatch(addVotes(updatedAnecdote))
  }
}


export default anecdoteSlice.reducer