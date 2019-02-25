const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost:27017/graphql-mongo', { useNewUrlParser: true }, function (err) {
   if (err) throw err;
   console.log('Successfully connected to MongoDB');
});

const { GraphQLServer } = require('graphql-yoga');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const People = require('./database/people');
const Service = require('./database/service');

const typeDefs = `
type Query {
    People:[People]
    PeopleByName(lastName: String!):[People]
    PeopleByXid(Xid: String!):[People]
    PeopleByID(id:ID!):[People]
    Service:[Service]
    ServiceByID(id:ID!):[Service]
}
type People {
	  id:ID!
    Xid:String!
    firstName:String!
    lastName:String!
    email:String!
    apps:[String]
    service:Service
}
type Service {
	  id:ID!
    name:String!
    location:String!
}
type Mutation {
	createPerson(Xid: String!, firstName: String!, lastName: String!, email: String!, service: String, apps: [String]): People
  updatePerson(id: ID!,Xid: String, firstName: String, lastName: String, email: String, service: String, apps: [String]): People
	deletePerson(id: ID!): People
  createService(name: String!, location: String!): Service
  updateService(id: ID!,name: String, location: String): Service
  deleteService(id: ID!): Service
}
`
const resolvers = {
  Query,
  Mutation
}
const port = 7777;
const server = new GraphQLServer({
  typeDefs,
  resolvers
})
server.start({port: port}, () => console.log(`The server is up and running on http://localhost:${port}`))
