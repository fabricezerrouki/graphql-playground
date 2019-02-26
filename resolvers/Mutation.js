const People = require('../database/people')
const Service = require('../database/service')

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
    },
	createService: async (parent, args) =>{
  		const newService = new Service({
  			name: args.name,
  			location: args.location
  		})
  		const error = await newService.save()
  		if(error) return error 
  		return newService
  	},
	updateService: (parent, args) => {
  		return new Promise( (resolve, reject) => {
			Service.findByIdAndUpdate(args.id, { $set: { name:args.name, location: args.location }}, { new: true }, function(err, result){
	  			if (err) return err;
	  			resolve(result)
	  		})
  		})
    },
  	deleteService: (parent, args) => {
  		return new Promise( (resolve, reject) => {
  			Service.findByIdAndRemove(args.id, function(err, result){
	  			if (err) return err;
	  			resolve(result)
	  		})
  		})
    }
};

module.exports = mutations;