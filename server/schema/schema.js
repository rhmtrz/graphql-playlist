const graphql = require('graphql');
const _ = require('lodash');

const Book = require('../modals/books')
const Author = require('../modals/authors')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLList
} = graphql;


let books = [
  {name: 'Name of the Wind', genra: 'Fantasy', id: '1', authorId: '1'},
  {name: 'The Final Empire', genra: 'Fantasy', id: '2', authorId: '2'},
  { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
  { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
  { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
];

let authors = [
  { name: 'Patrick Rothfuss', age: 44, id: '1' },
  { name: 'Brandon Sanderson', age: 42, id: '2' },
  { name: 'Terry Pratchett', age: 66, id: '3' },
];


const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genra: { type: GraphQLString },
    author: {
      type: AutherType,
      resolve(parent, args) {
        console.log(parent);
        // return _.find(authors, { id: parent.authorId });
      }
    }
  })
});

const AutherType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    book: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id});
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        // return _.find(books, {id: args.id})
      }
    },
    author: {
      type: AutherType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        // return _.find(authors, { id: args.id})
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books
      }
    },
    authors: {
      type: new GraphQLList(AutherType),
      resolve(parent, args) {
        // return authors
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AutherType,
      args: {
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });

        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLList },
        genra: { type: GraphQLList },
        authorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genra: args.genra,
          authorId: args.authorId,
        });

        return book.save();
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
