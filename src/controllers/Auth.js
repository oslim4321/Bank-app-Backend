const { handleLoginErr } = require("../Error/Custom-err");
const Account = require("../model/AccountSchema");
const User = require("../model/UserSchema")
const { createToken } = require("./CreateToken")


function generateRandomNumber() {
    let randomNumber = '';
    for (let i = 0; i < 10; i++) {
      randomNumber += Math.floor(Math.random() * 10);
    }
    return randomNumber;
  }

module.exports.OpenUserACcount = async(req, res) => {
    try {
        const response = await User.create(req.body.data)
        const token = createToken({
            id: response._id,
            isAdmin: response.isAdmin
        })
         res.status(200).json({ success: 'Account Created Successfullly', token, id: response._id })
        if (response) {
            const accountCreate = await Account.create({
                user: response._id,
                accountNumber: generateRandomNumber(),
                accountType: 'savings'
            })
        };
        // console.log(response)
    } catch (error) {
        res.status(404).json({ errorMessage: 'Failed Creating Account', error: error })
        console.log(error);
    }
}




module.exports.login = async (req, res) => {
    
    try {
        const request = req.body.data
        const response = await User.login(request.email, request.password)
       const token = createToken({
            id: response._id,
            isAdmin: response.isAdmin
        })
        const { password, ...others } = response._doc

         res.status(200).json({ ...others, token})
    } catch (error) {
        const err = handleLoginErr(error)
        res.status(404).json(err)
    }
}