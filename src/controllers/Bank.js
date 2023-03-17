

module.exports.userAccount = (req,res) => {
    res.send('cool')
}

module.exports.userpostData = (req, res) => {
    console.log(req.body)
    res.json({success: 'Account Crated Successfully'})
}