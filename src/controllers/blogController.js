const { default: mongoose } = require("mongoose");
const blogModel = require("../models/blogModels");
const authorModel = require("../models/authorModels")
const moment = require("moment")



const createBlog = async function(req, res){
    try{
    let data = req.body
    let authorId = data.authorId
    if (Object.keys(data).length == 0) {
        res.status(400).send({status: false, msg: "BAD REQUEST"})
    }
    if (!authorId) {
        res.status(400).send({status: false, msg: "BAD Request"})
    }
    let authorDetails = await authorModel.findById(authorId)
    if (!authorDetails) {
        res.status(404).send({status: false, msg: "authorId not exist"})
    }else {
        let blogCreated = await blogModel.create(data)
        res.status(201).send({status: true, data: blogCreated})
    }
    // let pqr = await blogModel.create(data)
    // res.status(201).send({msg: data})

}catch (error) {
        console.log(error);
        res.status(400).send({msg: error.message})
    }
};


const getBlogs = async function(req, res){
    try {
        let authorId = req.query.authorId
        let category = req.query.category
        if (!authorId){
            res.status(400).send({status: false, msg: "authorId is required"})
        }
        if (!category){
            res.status(400).send({status: false, msg: "category is required"})
        }
        let authorDetails = await authorModel.find({authorId:authorId})
        if (!authorDetails){
            res.status(404).send({status: false, msg: "authorId not exist"})
        }
        
        let blogDetails = await blogModel.find({authorId: authorId, category: category, isDeleted: false, isPublished: true})
        if (!blogDetails){
            res.status(404).send({status: false, msg: "No blogs found"})
        }else{
            res.status(200).send({status: true, data: blogDetails})
        }
    } catch (error) {
        console.log(error)
        res.status(404).send({msg: error.message})
    }
}


const updateBlog = async function(req,res){
    try {
        let blogId = req.params.blogId
        if(!blogId){
            res.status(400).send({status: false, msg: "blogId is required"})
        }
        let blogDetails = await blogModel.find({_id: blogId})
        if (!blogDetails){
            res.status(400).send({status: false, msg: "blogId not exist"})
        }else{
            let Date = moment().format("YYYY-MM-DD[T]HH:mm:ss");

            await blogModel.updateMany({_id: blogId}, {title: "Sahil", body: "injection", $push: {tags:["functionup"]}, $push: {subCategory: ["drama"]}, $set: {isPublished: true, publishedAt: Date}})
            let updateDetails = await blogModel.find({_id: blogId})
            res.status(201).send({status: true, data: updateDetails})
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({msg: error.message})
    }
}


const deleteBlog = async function(req, res){
    try {
        let blogId = req.params.blogId
        if (!blogId){
            res.status(400).send({status: false, msg: "blogId is required"})
        }
        let blogDetails = await blogModel.find({_id: blogId}, {isDeleted: false})
        if (!blogDetails){
            res.status(404).send({status: false, msg: "blog not exist"})
        }else{
            let Date = moment().format("YYYY-MM-DD[T]HH:mm:ss");
            let blogDetails = await blogModel.updateMany({_id: blogId}, {$set: {isDeleted: true, deletedAt: Date}})
            res.status(201).send()
            console.log(blogDetails)
        }
    } catch (error) {
        console.log(error)
        res.status(404).send({msg: error.message})
    }
}


const deleteByQueryParam = async function (req, res){
    try {
        let authorId = req.query.authorId
        let category = req.query.category
        if (!authorId){
            res.status(400).send({status: false, msg: "authorId is required"})
        }
        if (!category){
            res.status(400).send({status: false, msg: "category is required"})
        }
        let authorDetails = await authorModel.find({_id: authorId})
        if (!authorDetails){
            res.status(404).send({status: false, msg: "authorId not exist"})
        }else{
            let Date = moment().format("YYYY-MM-DD[T]HH:mm:ss");
            let updateDetails = await blogModel.updateMany({authorId: authorId,category:category},{$set:{isDeleted: true, deletedAt: Date}})
            res.status(201).send()
            console.log(updateDetails)
        }
    } catch (error) {
        console.log(error)
        res.status(404).send()
    }
}

module.exports.createBlog = createBlog;
module.exports.getBlogs = getBlogs;
module.exports.updateBlog = updateBlog;
module.exports.deleteBlog = deleteBlog;
module.exports.deleteByQueryParam = deleteByQueryParam;