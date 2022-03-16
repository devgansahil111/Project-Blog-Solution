const jwt = require("jsonwebtoken");


const auth = function (req, res, next){
    try {
        let token = req.headers["x-api-key"]
        if (!token){
            res.status(400).send({status: false, msg: "Token required, BAD REQUEST"})

            let decodedToken = jwt.verify(token, "Room No. 38")
            if (!decodedToken){
                res.status(401).send({status: false, msg: "Token invalid"})
            }
            next()
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({msg: error.message})
    }
}


const authorize = function(req, res, next){
    try {
        let authorId = req.params.authorId
        let token = req.headers["x-api-key"]
        if(!authorId){
            res.status(400).send({status: false, msg: "authorId required, BAD REQUEST"})
        }

        let decodedToken = jwt.verify(token, "Room No. 38")
        if ( decodedToken.authorId != authorId){
            return res.status(403).send({status: false, msg: "No such use exist"})
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(500).send({msg: error.message})
    }
}

module.exports.auth = auth;
module.exports.authorize = authorize;