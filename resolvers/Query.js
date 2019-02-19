const People = require('../database/people');
const Service = require('../database/service');
const queries = {
    People: async () => {
      const people = await People.find({}).populate('service').exec()
      return people.map(person => ({
        ...person._doc,
        id: person._doc._id,
        service: {
          ...person._doc.service._doc,
          id: person._doc.service._doc._id,
        },
      }))
    },
    PeopleByName: (root,args,context,info) => People.find({lastName: args.lastName}),
    PeopleByID: (root,args,context,info) => People.find({_id: args.id}),
    PeopleByXid: (root,args,context,info) => People.find({Xid: args.Xid}),
    Service: () => Service.find({}),
    ServiceByID: (root,args,context,info) => Service.find({_id: args.id})
  };

module.exports = queries;
