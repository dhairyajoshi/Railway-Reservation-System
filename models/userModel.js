const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    username: String,
    email: {type:String, required: true, unique: true},
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

module.exports = mongoose.model("SEUser",UserSchema) 