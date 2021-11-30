const Blog = require('../model/blog')

const oneBlog = 
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    }

const blogWithoutLikes = 
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    }

const oneBlogWithoutTitleUrl = 
    {
      author: 'Edsger W. Dijkstra',
      likes: 5
    }

const several = [
    {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    },
    {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    },
    {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    },
    {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    },
    {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    },
    {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
    }  
]
1
const addOne = async () => {
    const n = new Blog(oneBlog)
    const response = await n.save()
    return json(response)
}

const addSeveralInDb = async () => {
    await Blog.insertMany(several)
}

const nonExistingId = async () => {
    const b = new Blog(oneBlog)
    await b.save()
    await b.remove()
    return b.id
}

const itemCountDb = async () => {
    const a = await Blog.find({})
    return a.length
} 

module.exports = {
    addSeveralInDb,
    nonExistingId,
    itemCountDb,
    addOne,
    oneBlog,
    oneBlogWithoutTitleUrl,
    blogWithoutLikes  
}