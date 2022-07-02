module.exports = (err,req,res,net) => {
    console.log('err',err)
    res.status(500).json('err handling')
}