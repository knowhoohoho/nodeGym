
// var io = require('socket.io')(server);


module.exports = {
    apiUrl: "/auth/io",
    method: "post",
    runner: async (req, res) => {
        try {

                console.log(req.body)
        }catch (e) {

            console.log(e)
        }
    }
}