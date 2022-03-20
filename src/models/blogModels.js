const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const moment = require("moment");


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Title is required",
        trim: true
    },
    body: {
        type: String,
        required: "Body is required",
        trim: true
    },
    authorId: {
        type: ObjectId,
        required: "Blog Author is required",
        ref: "Author"
    },
    tags: [{
        type: String,
        trim: true
    }],
    category: {
        type: String,
        required: "Category is required",
        trim: true
    },
    subCategory: [{
        type: String,
        trim: true
    }],
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    publishedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });


module.exports = mongoose.model("Blog", blogSchema);