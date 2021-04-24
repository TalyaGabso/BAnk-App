const accountsModel = require("../models/accounts.model");

const addNewAccount = async (req, res) => {
	const { israeliID, name, email } = req.body;
	const account = new accountsModel({israeliID, name, email});
	console.log(account);
	if (!israeliID||!name||!email) {
		if(!israeliID){
		return res.status(200).json({ error: "Please Enter an account holder Passport Id" });
		}else if(!name){
			return res.status(200).json({ error: "Please Enter an account holder name" });
		}else if(!email){
			return res.status(200).json({ error: "Please Enter an account holder email" });
		}
	} 
	try {
		const result = await account.save();
		res.status(201).send({account:result});
	} catch (error) {
		console.log('error',error);
		res.status(500).send({Error:error});
	}
};

const getAccount = async (req, res) => {
	const { id } = req.params;
	try {
		const data = await accountsModel.findOne({ israeliID: id });
		if(!id){
         return res.status(404).send({ error: 'Invalid Input, ID does not exist' })
		}
		res.send({ account: data });
	} catch (error) {
		res.status(500).json({ Error: error });
	}
};

const getAccounts = async (req, res) => {
	try {
		const data = await accountsModel.find({});
		res.send({ accounts: data });
	} catch ({Error: error }) {
		res.status(500).json({ error });
	}
};
module.exports = {
	addNewAccount,
	getAccounts,
	getAccount,
};
