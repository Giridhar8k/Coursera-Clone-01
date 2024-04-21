const express = require("express");
const { userdetails, loginDetails, courseDetails } = require("./types");
const {userData, courseData}= require("./db");
const cors = require("cors");

const jwt = require("jsonwebtoken");
const jwtPassword = 'Testjwt';

const app = express();
app.use(express.json());

app.use(cors());

app.post('/signup',(req,res)=>{
    const signupPayLoad = req.body;
    const parsedpayLoad = userdetails.safeParse(signupPayLoad);

    if(!parsedpayLoad.success) return res.status(403).json("Invalid Signup details");
    else{
        userData.findOne({
            email:signupPayLoad.email
        }).then((resp)=>{
            if(resp) return res.status(403).json("user already exists with this email");
            else{
                userData.create({
                    username:signupPayLoad.username,
                    email:signupPayLoad.email,
                    password:signupPayLoad.password,
                    usertype:true
                }).then((result)=>{
                    if(result) return res.status(200).json("User created");
                    else return res.status(403).json("Error while creating a user");
                });
            }
        });
    }
});

app.post('/login',(req,res)=>{
    const loginPayLoad = req.body;
    const parsedLoginload = loginDetails.safeParse(loginPayLoad);
    if(!parsedLoginload.success) return res.status(403).json("Invalid Login Details");
    else{
        userData.findOne({
            email:loginPayLoad.email,
            password:loginPayLoad.password
        }).then((data)=>{
            if(data){
                const token = jwt.sign({email:loginPayLoad.email,password:loginPayLoad.password},jwtPassword);
                return res.status(200).json("Bearer "+token);
            }
            else{
                return res.status(403).json("Invalid Login Credentials"); 
            }
        })
    }

});

app.post('/createCourse',(req,res)=>{
    console.log('hitttt');
    console.log('');
    const coursePayLoad = req.body;

    console.log(coursePayLoad);
    const parsedCload = courseDetails.safeParse(coursePayLoad);
    console.log(parsedCload);

    if(!parsedCload.success) return res.status(403).json("Invalid Course Details");
    else{
        courseData.findOne({
            title:coursePayLoad.title
        }).then((result)=>{
            if(result) return res.status(403).json("Course with same title exists");
            else{
                courseData.create({
                    title:coursePayLoad.title,
                    description:coursePayLoad.description,
                    price:coursePayLoad.price
                }).then((result)=>{
                    if(result) return res.status(200).json("Course created successfully with course Id : "+result._id);
                    else return res.status(403).json("Error while creating Course");
                })
            }
        })
    }
});

app.get('/allcourseDetails',(req,res)=>{
    courseData.find({}).then((result)=>{
        return res.status(200).json({Courses:result});
    })
});

app.listen(4000);


/////