const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await fetch(baseUrl)

    if(!response.ok) {
        throw new Error('Failed to fetch anecdotes')
    }

    return await response.json()
}

const createNew = async (content) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, votes: 0 })
    }

    const response = await fetch(baseUrl, options)
    
    if(!response.ok) {
        throw new Error('Failed to create anecdote')
    }

    return await response.json()
}

const vote = async (id) => {
    const getResponse = await fetch(`${baseUrl}/${id}`)

    if(!getResponse.ok) {
        throw new Error('Failed to fetch anecdote')
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
export default { getAll, createNew, vote }