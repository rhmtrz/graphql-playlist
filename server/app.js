const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const app = express();
const mongoose = require('mongoose');

//  database
mongoose.connect('mongodb://rhmt:rahmathao2249@ds161092.mlab.com:61092/gpl-playlist')
mongoose.connection.once('open', () => {
  console.log('connected to database');
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('now listening for request on port 4000');
})
