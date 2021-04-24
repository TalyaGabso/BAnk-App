const mongoose = require("mongoose");
const validator = require('validator');

const account = mongoose.model('account',{

	israeliID: {
		type: String,
		required: true,
		unique: true,
		validate(value) {
			console.log(value);
			if (value.length !== 9) {
				throw new Error('Invalid ID')
			}
		}
	},
	name: {
		type: String,
		required: true,
		unique: false,
		// validate(value) {
		// 	console.log(value);
		// 	if () {
		// 		throw new Error('Invalid input, name must contain first and last name')
		// 	}
		// }
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate(value){
			console.log(value);
			if(!validator.isEmail(value)){
				throw new Error('Invalid Email')
		  }
		}
	},
	isActive: {
		type: Boolean,
		required: true,
		unique: false,
		default: true,
	},
	account: {
		credit: {
			type: Number,
			required: false,
			unique: false,
			minimum:0,
			default: 0
			// validate(value){}
		},
		cash: {
			type: Number,
			required: false,
			unique: false,
			minimum:0,
			default: 0
			// validate(value){}
		}

	}

});

module.exports = account;
