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
    serviceId:String
    apps:[String]
    service:Service
}
type Service {
	  id:ID!
    name:String!
    location:String!
    peoples:[People]
}
type Mutation {
	createPerson(Xid: String!, firstName: String!, lastName: String!, email: String!, serviceId: String, apps: [String]): People
  updatePerson(id: ID!,Xid: String, firstName: String, lastName: String, email: String, serviceId: String, apps: [String]): People
	deletePerson(id: ID!): People
}
`
const resolvers = {
  Query,
  Mutation
}
const server = new GraphQLServer({
  typeDefs,
  resolvers
})
server.start({port: 7777}, () => console.log(`The server is up and running on http://localhost:7777`))
