const mongoose = require("mongoose");
const transaction = mongoose.model('transaction',{
   account: {
      israeliID: {
         type: String,
         require: true,
         uniqe: true
      },
      name: {
         type: String,
         require: true,
         uniqe: false
      }
   },
   transaction_type: {
      type: String,
      require: true,
      uniqe: false
   },
   transaction_amount: {
      type: Number,
      require: true,
      uniqe: false,
      minimum:0
   }
});
module.exports = transaction;
