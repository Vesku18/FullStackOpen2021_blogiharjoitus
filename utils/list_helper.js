var _ = require('lodash')

const dummy = (blogs) => {
    // ...
    return 1
  }

const totalLikes = (blogs) => {
    lista =blogs.map(n => n.likes)
    const reducer = ((a,b) => (a+b))
    uusLista = lista.reduce(reducer, 0)
    return uusLista
}

const favoriteBlog = (blogs) => {
  const reducer = (a,b) => ( a.likes>b.likes ? a : b)
  uusLista = blogs.reduce(reducer, 0)
  console.log(uusLista)
  return uusLista
}

const mostBlogs = (blogs) => {
  const aCount = _.countBy(blogs, (n) => {return n.author})
  const mostBlogs = _.reduce(_.toPairs(aCount), (a,b) => (a > b ? a : b ))
  return(mostBlogs[0])
}

const mostLikes = (blogs) => {
  const grouped = _.groupBy(blogs, (n) => {return n.author})
  let most= 0
  let sums={}
  for (const [nimi,lista] of _.toPairs(grouped)) {
    let a = _.sumBy(lista,(o) => {return o.likes })
    if (a>most) {
        sums=({'name': nimi, 'likes':a})
        most = a
    }
  }
  return(sums)
}

module.exports = { 
    dummy, 
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}