const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const serviceSchema = new Schema({
    name: { type: String },
    location: { type: String }
},{ versionKey: false })

module.exports = mongoose.model('service', serviceSchema);
