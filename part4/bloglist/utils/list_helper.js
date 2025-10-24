const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
   const blogLikes = blogs.reduce((sum, blogs) => { return sum + blogs.likes},0)
   return blogLikes
}

module.exports = { dummy, totalLikes }

