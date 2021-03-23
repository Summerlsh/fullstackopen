const _ = require('lodash')
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, cur) => {
    return acc + cur.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return
  }

  const likesArr = blogs.map(blog => blog.likes)
  const favorite = blogs[likesArr.indexOf(Math.max(...likesArr))]

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return
  }
  const authorArr = blogs.map(blog => blog.author)
  // 统计每个作者的博客数量
  const dict = _.countBy(authorArr)
  const maxBlogs = _.max(_.values(dict))
  const authorName = _.findKey(dict, count => count === maxBlogs)
  return {
    author: authorName,
    blogs: maxBlogs
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return
  }
  // 获取每个作者的likes
  const dict = {}
  blogs.forEach(blog => {
    if (dict[blog.author]) {
      dict[blog.author] += blog.likes
    } else {
      dict[blog.author] = blog.likes
    }
  })
  const maxLikes = _.max(_.values(dict))
  const authorName = _.findKey(dict, count => count === maxLikes)
  return {
    author: authorName,
    likes: maxLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
