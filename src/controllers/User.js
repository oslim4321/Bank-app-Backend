const User = require('../model/UserSchema')
const Account = require('../model/AccountSchema')


module.exports.index = async (req,res) => {
    try {
        const response = await User.find();
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({error:"cannot get all user"})
    }
}


module.exports.show = async (req, res) => {
    // console.log(req.params.id);
    // console.log('req came in')
    try {
        const response = await User.findById(req.params.id).select('-password, -resident').lean();
        const acc = await Account.find({user: req.params.id}).lean();
        // const combineUserAcc = Object.assign({}, response, acc )
        const combineUserAcc = ({ ...acc[0], ...response})

        if (!response || !acc) {
            return  res.status(404).json({error:"cannot find user!"})
        }
        res.status(200).json(combineUserAcc)
    } catch (error) {
        res.status(404).json({error:"cannot find user"})
    }
}

module.exports.getUserBaseTransa =async (req,res) => {
    const response = await Account.findOne({ accountNumber: req.params.id })
    if (!response) {
        return  res.status(404).json({error:"cannot find this Account"})
    }
    const user = await User.findById(response.user).select('firstName lastName phone')
    res.status(200).json(user)
}

module.exports.delete = async (req,res) => {
    try {
        const response = await User.findByIdAndDelete(req.params.id)
        if (!response) {
            return  res.status(404).json({error:"cannot find Account to delete"})
        }
        res.status(200).json({success: 'Account Deleted Successfully'}, response)
    } catch (error) {
        res.status(404).json({error:"cannot delete user"})
    }
}