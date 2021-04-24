const accountsModel = require("../models/accounts.model");
const transactionsModel = require("../models/transactions.model");

const deposit = async (req, res) => {
   const accountHolder = req.params.id;
   const amount = req.body.amount;
   try {
      if (amount <= 0) {
         return res.status(200).send('Invalid Input, amount must be MORE than 0$')
      }
      const account = await accountsModel.findOneAndUpdate({ israeliID: accountHolder }, { $inc: { "account.cash": amount } });
      if (!account) {
         return res.status(404).send({ error: 'Invalid Input, account not found' })
      }
      const transaction = new transactionsModel({
         account: {
            israeliID: accountHolder,
            name: account.name
         },
         transaction_type: "Deposite",
         transaction_amount: amount
      })

      res.send({ account: account, transaction: transaction })
   }
   catch (error) {
      res.status(400).json({ Error: error })
   }
};

// update Credit: ONLY add credit
const updateCredit = async (req, res) => {
   const accountHolder = req.params.id;
   const amount = req.body.amount;
   try {
      if (amount <= 0) {
         return res.status(200).send("Amount must be more than 0$")
      }
      const account = await accountsModel.findOneAndUpdate({ israeliID: accountHolder }, { $inc: { "account.credit": amount } });
      if (!account) {
         return res.status(404).send({ error: 'Invalid Input, account not found' })
      }
      const transaction = new transactionsModel({
         account: {
            israeliID: accountHolder,
            name: account.name
         },
         transaction_type: "Deposite",
         transaction_amount: amount
      })
      res.send({ account: account, transaction: transaction })
   }
   catch (error) {
      res.status(400).json({ Error: error })
   }
};

// Withdraw: withdraw cash from a user (cash can be in minus base on credit limit)
const withdraw = async (req, res) => {
   const accountHolder = req.params.id;
   const amount = req.body.amount;
   try {
      if (amount <= 0) {
         return res.status(200).send('Invalid Input, amount must be MORE than 0$')
      }
      const account = await accountsModel.findOneAndUpdate({ israeliID: accountHolder }, { $inc: { "account.cash": -amount } });
      if (!account) {
         return res.status(404).send({ error: 'Invalid Input, account not found' })
      }
      const transaction = new transactionsModel({
         account: {
            israeliID: accountHolder,
            name: account.name
         },
         transaction_type: "Deposite",
         transaction_amount: amount
      })
      res.send({ account: account, transaction: transaction })
   }
   catch (error) {
      res.status(400).json({ Error: error })
   }
};
// Transfer: transfer cash between users (cash can be in minus base on credit limit)
const transfer = async (req, res) => {
   const accountHolder = req.params.id;
   const amount = req.body.amount;
   const toAccountHolder = req.body.israeliID
   // console.log(accountHolder);
   // console.log(amount);
   // console.log(toAccountHolder);
   try {
      if (amount <= 0) {
         return res.status(200).send('Invalid Input, amount must be MORE than 0$')
      }
      const fromAccount = await accountsModel.findOneAndUpdate({ israeliID: accountHolder }, { $inc: { "account.cash": -amount } });
      const toAccount = await accountsModel.findOneAndUpdate({ israeliID: toAccountHolder }, { $inc: { "account.cash": amount } });
      if (!fromAccount || !toAccount) {
         return res.status(404).send({ error: 'Invalid Input, account not found' })
      }
      const fromTransaction = new transactionsModel({
         account: {
            israeliID: accountHolder,
            name: fromAccount.name
         },
         transaction_type: "Transfer - withdraw",
         transaction_amount: amount
      })
      
      const toTransaction = new transactionsModel({
         account: {
            israeliID: toAccountHolder,
            name: toAccount.name
         },
         transaction_type: "Transfer - Deposit",
         transaction_amount: amount
      })
      console.log(fromTransaction);
      console.log(toTransaction);
      res.send(`transfer to ${toAccount.name} was seccesfull`)
   }
   catch (error) {
      res.status(400).json({ Error: error })
   }
};
module.exports = {
   deposit,
   updateCredit,
   withdraw,
   transfer,
};