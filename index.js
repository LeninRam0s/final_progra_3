'use strict'
//API
require('dotenv').config()
const express = require('express');
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql');
//const { buildSchema } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools')
const { readFileSync } = require('fs')
const { join } = require('path')
var resolvers = require('./lib/resolvers');
const { assertWrappingType } = require('graphql');

var app = express();
const port = process.env.port || 3000
 
// definiendo el esquema inicial
const typeDefs = readFileSync(
  join(__dirname, 'lib', 'schema.graphql'),
  'utf-8'
)
const schema = makeExecutableSchema({ typeDefs,resolvers })

app.use(cors())
 
app.use('/api', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true //true par mostrar la interfaz grafica de GraphQL en la web
}));
app.listen(port);
console.log(`El servidor GraphQL de K || L esta corriendo en http://localhost:${port}/api`);
//ejecutar el query 
//graphql(schema, '{ saludo }', resolvers).then((data) => {console.log(data)})