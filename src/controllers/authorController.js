const authorModel= require("../models/authorModels");
const jwt = require("jsonwebtoken");


const createAuthor= async function (req, res) {
    try {
        let data = req.body;
        let createdAuthor = await authorModel.create(data)
        res.status(201).send({data: createdAuthor})

    } catch (error) {
        console.log(error);
        res.status(400).send({msg: error.message})
    }
};



const loginAuthor = async function(req, res){
    try {
        let email = req.body.email
        let password = req.body.password
        if (!(email && password)){
            res.status(400).send({status: false, msg: "Email and Password is required, BAD REQUEST"})
        }
        // if (!email){
        //     res.status(400).send({status: false, msg: "Email required, BAD REQUEST"})
        // }
        // if (!password){
        //     res.status(400).send({status: false, msg: "Password required, BAD REQUEST"})
        // }
        let authorDetails = await authorModel.findOne({email: email, password: password})
        if (!authorDetails){
            res.status(404).send({status: false, msg: "Email and Password not matched"})
        } else {
            let token = jwt.sign({authorId: authorDetails._id, title: authorDetails.title}, "Room No. 38")
            res.setHeader("x-api-key", token)
            res.status(201).send({status: true, msg: "Your login is successful", data: token})
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({msg: error.message})
    }
} 

module.exports.createAuthor = createAuthor;
module.exports.loginAuthor = loginAuthor;