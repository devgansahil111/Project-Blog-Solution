const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: "First name is required",
        trim: true
    },
    lastName: {
        type: String,
        required: "Last name is required",
        trim: true
    },
    title: {
        type: String,
        required: "Title is required",
        enum: ["Mr", "Mrs", "Miss"]
    },
    email: {
        type: String,
        required: "Email address is required",
        unique: true,
        validate: {
            validator: function (email) 
            {
             if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
              {
                return (true)
              }
                alert("You have entered an invalid email address!")
                return (false)
            }
        }
    },
    password: {
        type: String,
        required: "Password is required",
        trim: true
    }
}, { timestamps: true });



module.exports = mongoose.model("Author", authorSchema);