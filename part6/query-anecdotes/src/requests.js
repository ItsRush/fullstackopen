const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
    const response = await fetch(baseUrl)
    if(!response.ok) {
        throw new Error('Failed to fetch anecdotes')
    }
    return await response.json()
}

export const createAnecdote = async (newAnecdote) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newAnecdote)
    }
    
    const response = await fetch(baseUrl, options)

    if(!response.ok) {
        throw new Error('Failed to create anecdote')
    }

    return await response.json()
}

export const addVote = async (id) => {
    const getResponse =  await fetch(`${baseUrl}/${id}`)

    if(!getResponse.ok){
        throw new Error('Failed to fetch anecdotes')
    }

    const anecdoteToVote = await getResponse.json()

    const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
    }

    const options = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(votedAnecdote)
    }

    const response = await fetch(`${baseUrl}/${id}`, options)

    return await response.json()
}