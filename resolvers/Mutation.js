const People = require('../database/people')
const mutations = {
    createPerson: async (parent, args) =>{
  		const newPerson = new People({
  			Xid: args.Xid,
			firstName: args.firstName,
  			lastName: args.lastName,
			email: args.email,
			apps: args.apps,
			serviceId: args.serviceId
  		})
  		const error = await newPerson.save()

  		if(error) return error 
  		return newPerson
  	}, 	
  	deletePerson: (parent, args) => {
  		return new Promise( (resolve, reject) => {
  			People.findByIdAndRemove(args.id, function(err, result){
	  			if (err) return err;
	  			resolve(result)
	  		})
  		})
    },
	updatePerson: (parent, args) => {
  		return new Promise( (resolve, reject) => {
			People.findByIdAndUpdate(args.id, { $set: { lastName: args.lastName }}, { new: true }, function(err, result){
	  			if (err) return err;
	  			resolve(result)
	  		})
  		})
    }
};

module.exports = mutations;