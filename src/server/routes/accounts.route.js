const express = require("express");
const router = express.Router();
const accountsController = require("../controllers/accounts.controller");

router.post("/", (req, res) => {
	accountsController.addNewAccount(req, res);
}).get("/", (req, res) => {
	accountsController.getAccounts(req, res);
}).get("/:id", (req, res) => {
	accountsController.getAccount(req, res);
});

module.exports = router;
