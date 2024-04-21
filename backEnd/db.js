const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://admin:MUUVy9G11kRKqszv@mark-one.uecgwxo.mongodb.net/COURSERA_CLONE_01');

const userSignUpSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    usertype:Boolean
});

const courseSchema = mongoose.Schema({
    title:String,
    description:String,
    price:Number
})

const userData = mongoose.model('USER',userSignUpSchema);
const courseData = mongoose.model('COURSE',courseSchema);

module.exports={
    userData:userData,
    courseData:courseData
}