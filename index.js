const { ApolloServer, gql } = require('apollo-server')

const book = [
    {id: 1, title: "Family Wisdom", author: "Robin Sharma"}, 
    {id: 2, title: "Fifth Mountain", author: "Paulo Coehlo"}
]

const typeDefs = gql`

    type BookType {
        id:Int!
        title: String!
        author: String!
    }

    type Query {
        myBooks: [BookType]
    }

    type Mutation {
        addBook(id: Int, title: String!, author: String!) : BookType
    }

    type Mutation {
        addBook(id: Int, title: String!, author: String!) : BookType
        deleteBook(id: Int!) : Boolean
    }

`

const resolvers = {
    Query: {
        myBooks: () => book 
    },

    Mutation: {
        addBook: (parent, args) => {
            book.push({id: args.id, title: args.title, author: args.author })
            return { id: args.id, title: args.title, author: args.author }
        },
        
          
        deleteBook: (parent, args) => {
           // 
           //const ok = Boolean( book[args.id] == null)
           book.splice((args.id - 1), 1)
          
           
           
            return true
         }

    }
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => {
    console.log(`Server is running at ${url}`)
})