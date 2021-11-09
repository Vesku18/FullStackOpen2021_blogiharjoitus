const dummy = (blogs) => {
    // ...
    return 1
  }
  
  module.exports = {
    dummy
  }

const totalLikes = (blogs) => {
    lista =blogs.map(n => n.likes)
    const reducer = ((a,b) => (a+b))
    uusLista = lista.reduce(reducer, 0)
    return uusLista
}

module.exports = { 
    dummy, 
    totalLikes,
}