const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogModels");


const auth = function (req, res, next){
    try {
        let token = req.headers["x-api-key"]
        if (!token){
            res.status(401).send({status: false, msg: "Token is required"})
        }
            let decodedToken = jwt.verify(token, "Room No. 38")
            if (!decodedToken){
                res.status(401).send({status: false, msg: "Token is invalid"})
            }
            next()
        }
     catch (error) {
        console.log(error)
        res.status(500).send({msg: error.message})
    }
}


const authorize = async function(req, res, next){
    try {
        let authorId = req.params.authorId
        let token = req.headers["x-api-key"]
        if(!authorId){
            res.status(400).send({status: false, msg: "authorId required, BAD REQUEST"})
        }

        let decodedToken = jwt.verify(token, "Room No. 38")
        let blogDetails= await blogModel.findById(authorId)
        if(!blogDetails) {
            res.status(404).send({status: false, msg: "id not found"})
        }
        if (decodedToken.authorId != blogDetails.authorId) {
            return res.status(403).send({ status: false, msg: "you are not authorized" })
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(500).send({msg: error.message})
    }
}

module.exports.auth = auth;
module.exports.authorize = authorize;