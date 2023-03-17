const Account = require("../model/AccountSchema");
const SendMoney = require("../model/SendMoney");
const Transaction = require("../model/TransactionSchema");
const TransactionSchema = require('../model/TransactionSchema')


module.exports.sendMoney = async(req, res) => {
    let request = req.body
    try {
        const sender = await Account.findOne({accountNumber: request.sender })
      const recipient = await Account.findOne({ accountNumber: request.recipient })
        /* check if sender is inside database */
        if (!sender) {
          return  res.status(404).json({error: 'cant find the sender account'})
        }
         /* check if receiver is insoide database */
        if (!recipient) {
            return  res.status(404).json({error: 'cant find the recipient account'})
        }

        /* check if sender amount is greater thank the amount is seding*/
        if (sender.balance < request.amount) {
            return  res.status(404).json({error: 'You dont have enounh to send '})
        }

        sender.balance -= request.amount
        recipient.balance += request.amount;

        await sender.save()
        await recipient.save()
          // Create the transaction
       const sendMoney = await SendMoney.create({
            sender: sender.user,
            recipient: recipient.user,
            amount: request.amount,
            description: request.description
        });

        res.json({ senders: sender, reciver: recipient, sendMoney})
         // Send debit alert to the sender
         // Create the transaction
          const debit = await TransactionSchema.sendDebitAlert(sender.user, request.amount, recipient.accountNumber, request.description);
          const credit = await TransactionSchema.sendCreditAlert(recipient.user, request.amount,sender.accountNumber, request.description);
        // console.log(debit,credit )
        // console.log('i jjust run🤣🤣')
          // Save the transaction document to the database
       
        
    } catch (error) {
        console.log(error)
    }
}