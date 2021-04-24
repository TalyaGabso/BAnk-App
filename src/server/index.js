const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const cors =require ('cors');

const app = express();
const bankTransactionsRoute = require('./routes/transactions.route');
const accountRoute = require('./routes/accounts.route');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/bank/transactions',bankTransactionsRoute);
app.use('/api/bank/accounts', accountRoute);
//connect to db with mongoose
const uri = "mongodb+srv://TalyaGabso:eROSsRFPAeYQp956@clusterprojects.bqkbi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
}).then(() => {
	console.log("database connect");
});

app.listen(process.env.PORT || 5000, () => {
	console.log(`application start at ${process.env.PORT || 5000}`);
});
