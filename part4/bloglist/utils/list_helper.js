const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
   const blogLikes = blogs.reduce((sum, blogs) => { return sum + blogs.likes},0)
   return blogLikes
}

const favoriteBlog = (blogs) => {
    const mostLikes = Math.max(...blogs.map(blog => blog.likes))
    const mostLiked = blogs.find(blog => blog.likes === mostLikes)
    return mostLiked
}

module.exports = { dummy, totalLikes, favoriteBlog }

