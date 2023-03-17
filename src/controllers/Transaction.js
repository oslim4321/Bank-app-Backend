const Account = require('../model/AccountSchema')
const TransactionSchema = require('../model/TransactionSchema')

module.exports.create = async (req, res) => {
    try {
        let request = req.body.data
        console.log(request)
        console.log(request.accountNumber)
        // Find the account by account number
        const account = await Account.findOne({ accountNumber: request.accountNumber });
        // Check if account exists
        if (!account) {
            return res.status(404).send({
                error: 'Account not found',
            });
        }
    
        //     // Check if transaction type is valid (either 'withdrawal' or 'deposit')
        if (request.type !== 'withdrawal' && request.type !== 'deposit') {
            return res.status(400).send({
                error: 'Invalid transaction type',
            });
        }
    
        //     // Check if transaction amount is valid (greater than 0)
        if (request.amount <= 0) {
            return res.status(400).send({
                error: 'Invalid transaction amount',
            });
        }
    
        //     // Perform the transaction
        if (request.type === 'withdrawal') {
            // Check if account has sufficient balance
            if (account.balance < request.amount) {
                return res.status(400).send({
                    error: 'Insufficient balance',
                });
            }

            //       // Deduct the amount from the account balance
            account.balance -= request.amount;
        } else if (request.type === 'deposit') {
            // Add the amount to the account balance
            account.balance += request.amount;
        }
    
        //     // Save the updated account
        await account.save();
        // save the transaction history
        await TransactionSchema.create({
            account: account.user,
            amount: request.amount,
            accountNumber: request.accountNumber,
            type: request.type,
            description: request.description
        })

        return res.status(200).send({
            message: 'Transaction successful',
            account,
        })
    
    } catch (error) {
        return res.status(500).send({
            message: 'Error performing transaction',
            error: error.message,
        });
        
    }
}

module.exports.show = async(req,res) => {
  try {
    console.log(req.params.id)
      const response = await TransactionSchema.find({ account: req.params.id }).sort({ createdAt: 1 })
      res.status(200).json(response)
      if (!response) {
        res.status(404).json({error: 'cant find transaction related to this account'})
      }
  } catch (error) {
    res.status(404).json(error)
    console.log(error)
  }
}
