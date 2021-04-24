const express = require("express");
const router = express.Router();
const transactionsController = require("../controllers/transactions.controller");

router.put("/deposit/:id", (req, res) => {
   transactionsController.deposit(req, res);
}).put("/update-credit/:id", (req, res) => {
   transactionsController.updateCredit(req, res);
}).put("/withdraw/:id", (req, res) => {
   transactionsController.withdraw(req, res);
}).put("/transfer/:id", (req, res) => {
   transactionsController.transfer(req, res);
});

module.exports = router;
