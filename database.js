const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
var mongojs = require('mongojs');
var db = mongojs('mongodb+srv://KavyaSri:Kavya6084@cluster0.ya7qtel.mongodb.net/CommunityConnect?retryWrites=true&w=majority',['mentor','mentee','messages','mymentors']);
const saltRounds = 10;
const socket = require("socket.io");

app.use(express.json());
app.use(cors());

const server = app.listen(3001,()=>{
    console.log("Listening..!")
});

app.post('/register1',(req,res)=>{
    const FirstName = req.body.FirstName
    const LastName = req.body.LastName
    const Email = req.body.Email
    const Password = req.body.Password
    const RegdNo = req.body.RegistrationNumber
    const telegram = req.body.Username
    
    bcrypt.hash(Password,saltRounds,(err,hash)=>{
        if(err){
            console.log(err);
        }
        else{
            db.mentee.find({RegistrationNumber: RegdNo},(err,response)=>{
                if(response.length == 0){
                    db.mentee.find({Telegram: telegram},(err,resp)=>{
                        if(resp.length == 0){
                            db.mentee.insert({FirstName:FirstName,LastName:LastName,Email:Email,Password:hash,RegistrationNumber:RegdNo,Telegram:telegram,isAvatharImageSet:false,AvatharImage : "",users:[]},(error,res1)=>{
                                res.send({message:"Let's begin your journey with Community Connect."});
                            })
                        }
                        else{
                            res.send({message:"Username already exist find another"});
                        }
                    })
                }
                else{
                    res.send({message:"Already registered..!Please Login"})
                }
            }) 
        }
    })
});
app.post('/addMessage',(req,res) => {
    const from = req.body.from
    const to = req.body.to
    const message = req.body.message
    db.messages.insert({message:{text:message},users:[from,to],sender:from,createdAt : new Date(),updatedAt : new Date()},(error,res1)=>{
        res.send({message:"Data Inserted."})
    });
})
app.post('/getMessages',async (req,res) =>{
    const from = req.body.from
    const to = req.body.to
    db.messages.find({users : {$all : [from,to]}},(err,res1)=>{
        if(err){
            console.log(err)
        }
        else{
            const projectedMessages = res1.map((msg) => {
                return {
                  fromSelf: msg.sender.toString() === from,
                  message: msg.message.text,
                };
            });
            return res.json(projectedMessages);
        }
        
    })

})

app.post('/login1', (req,res) => {
    const RegdNo = req.body.RegdNo
    const password = req.body.Password

    db.mentee.find({RegistrationNumber:RegdNo},(err,result)=>{
        if(err){
            res.send({err:err})
        }
        if(result.length > 0){
            bcrypt.compare(password,result[0].Password,(error,response)=>{
                if(response){
                    return res.json(result);
                }
                else{
                    res.send({message:"Wrong Credentials..!"})
                }
            })
        }
        else{
            res.send({message:"User Doesn't Exist! Please register"})
        }
    })
})

app.post('/signup1',(req,res) => {
    const Des = req.body.Des;
    const tags = req.body.Tags;
    const RegdNo = req.body.RegistrationNumber;
    const Name = req.body.Name
    const Telegram = req.body.Telegram
    db.mentor.find({RegistrationNumber:RegdNo},(err,res2)=>{
        if(res2.length == 0){
            db.mentor.insert({RegistrationNumber:RegdNo,Tags:tags,Name:Name,Description:Des,Telegram:Telegram,Rating:0},(err,res1)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.send({message:"Congratulations on being a mentor, Please check mentorship guidelines to be a perfect mentor."})
                }
            })
        }
        else{
            res.send({message:"User Already exist..! Update if needed."})
        }
    })
});

app.post('/displaymentors',(req,res)=>{
    var reg = req.body.mentee
    var stat = "Accepted"
    db.mymentors.find({mentee:reg,status:stat},(err,res1)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(res1)
        }
    })
})

app.post('/displayrequestedmentee',(req,res)=>{
    var mentor = req.body.mentor
    db.mymentors.find({mentor:mentor,status:"Requested"},(err,res1)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(res1)
        }
    })
})
app.post('/displaymentees',(req,res)=>{
    var mentor = req.body.mentor
    db.mymentors.find({mentor:mentor,status:"Accepted"},(err,res1)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(res1)
        }
    })
})

app.post('/getProfile',(req,res) => {
    var val = req.body.sendvalue
    var regdno = req.body.regdno
    db.mentor.find({Tags:{$regex : val},RegistrationNumber:{$ne:regdno}},(err,res1)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(res1);
        }
    })
})


app.post('/setStatus',(req,res)=>{
    var mentor = req.body.mentor
    var mentee = req.body.mentee
    var des  = req.body.Application
    var menteeTelegram = req.body.menteeTelegram
    db.mymentors.find({mentee:mentee,mentor:mentor},{mentee:0},(err,res2)=>{
        var result = JSON.stringify(res2)
        if(err){
            throw err
        }
        else if(res2.length != 0 && result.includes(mentor)){
            var stat = res2[0].status
            if(stat == "Requested"){
                res.send({message:"You have already requested for this mentor"})
            }
            else if(stat == "Accepted"){
                res.send({message:"Already you are being mentored by the requested mentor"})
            }
            else{
                db.mymentors.updateOne({mentor:mentor,mentee:mentee},{$set:{status:"Requested",cause:des,menteeTelegram:menteeTelegram}},(e1,res5)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        res.send({message:"This mentor has rejected your request, We are requesting again"})
                    }
                })
            }
        }
        else{
            db.mentor.find({RegistrationNumber:mentor},(err,res1)=>{
                if(err){
                    console.log(err)
                }
                else{
                    var name = res1[0].Name
                    db.mymentors.insert({mentor:mentor,mentee:mentee,name:name,cause:des,status:"Requested",menteeTelegram:menteeTelegram},(err,res1)=>{
                        if(err){
                            throw err;
                        }
                        else{
                            res.send({message:"Your request is being processed..!"})
                        }
                    })
                }
            })
        }
    })
})

app.post('/setStatusA',(req,res)=>{
    var mentor = req.body.mentor
    var mentee = req.body.mentee
    var status = req.body.status
    db.mentor.find({RegistrationNumber:mentor},(err1,res2)=>{
        if(err1){
            console.log(err1)
        }
        else{
            var name = res2[0].Name
            var des = res2[0].Description
            var Tags = res2[0].Tags
            var mentorTelegram = res2[0].Telegram
            db.mymentors.updateOne({mentor:mentor,mentee:mentee},{$set:{status:status,tags:Tags,Description:des,mentorTelegram:mentorTelegram}},(err,res1)=>{
                if(err){
                    console.log(err)
                }
                else{
                    res.send({message:"You have accepted "+mentee+" as your mentee"})
                }
            })
            db.mentee.updateOne({RegistrationNumber:mentor},{$push:{users:mentee}})
            db.mentee.updateOne({RegistrationNumber:mentee},{$push:{users:mentor}})
        }
    })
})

app.post('/deletestatus',(req,res)=>{
    var mentor = req.body.mentor
    var mentee = req.body.mentee
    db.mymentors.updateOne({mentor:mentor,mentee:mentee},{$set:{status:"Rejected"}},(err,res1)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send({message:"You have Rejected "+mentee+" as mentee"})
        }
    })
})

app.post('/changepswd',(req,res)=>{
    var Pass = req.body.Password
    var regdno = req.body.regdno
    bcrypt.hash(Pass,saltRounds,(err,hash)=>{
        if(err){
            console.log(err);
        }
        else{
            db.mentee.find({RegistrationNumber:regdno},(err,res1)=>{
                if(err){
                    console.log(err)
                }
                else if(res1.length == 0){
                    res.send({message:"Please signup to change your password"})
                }
                else{
                    db.mentee.updateOne({RegistrationNumber:regdno},{$set:{Password:hash}},(error,res2)=>{
                        if(error){
                            console.log(error)
                        }
                        else{
                            res.send({message:"Your password has been changed"})
                        }
                    })
                }
            })  
        }
    })
})

app.post('/setrating',(req,res)=>{
    var mentor= req.body.mentor
    var rating = req.body.rating
    db.mentor.find({RegistrationNumber:mentor},(err,res1)=>{
        if(err){
            console.log(err)
        }
        else{
            var oldrating = res1[0].Rating
            if(oldrating == 0){
                oldrating = rating
            }
            var newrating = (oldrating+rating)/2
            db.mentor.updateOne({RegistrationNumber:mentor},{$set:{Rating:newrating}},(err1,res2)=>{
                if(err1){
                    console.log(err1)
                }
                else{
                    res.send({message:"You have rated "+res1[0].Name+" with "+rating+" stars."})
                }
            })
        }
    })
})

app.post('/sentrequests',(req,res)=>{
    var mentee = req.body.mentee
    db.mymentors.find({mentee:mentee},(err,res1)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(res1)
        }
    })
})

app.post('/getdetails', (req,res)=>{
    var mentor = req.body.mentor
    // console.log(mentor)
    db.mentor.find({RegistrationNumber: mentor}, (err, res1) => {
        if(err){
            console.log(err)
        }
        else if(res1.length == 0){
            res.send({Tags: "[]", Des : ""})
        }
        else{
            res.send({Tags: res1[0].Tags, Des : res1[0].Description})
        }
    })
} )
app.post('/AllUsers', (req,res)=>{
    var mentee = req.body.mentee
    let arr = [];
    db.mentee.find({RegistrationNumber: mentee}, (err, res1) => {
        if(err){
            console.log(err)
        }
        else if(res1 !== 0){
            var user = res1[0].users;
            for(var i = 0; i < user.length; i++) {
                db.mentee.find({RegistrationNumber: user[i]}, (err, res2) => {
                    if(err){
                        console.log(err)
                    }
                    else if(res2 !== 0){
                        const allusers = Object.assign({}, ...res2);
                        arr = [...arr, allusers];
                        //console.log(arr)
                    }
                });
            }
        }
    })
})
app.post('/SetAvathar1',(req,resp) =>{
    var mentee = req.body.mentee
    var image = req.body.image
    db.mentee.find({RegistrationNumber:mentee},(err,respo)=>{
        if(respo.length !== 0){
            db.mentee.updateOne({RegistrationNumber:mentee},{$set : {isAvatharImageSet:true,AvatharImage : image}},(err,re1)=>{
                if(err){
                    console.log(err);
                }
                else{
                    resp.send({message:"Avathar Updated Successfully."})
                }
            })
        }
        else{
            console.log(err);
            resp.send({message:"Error in updation"})
        }
    })
});

app.post('/updatedetails', (req, res) => {
    var mentor = req.body.mentor
    var Des = req.body.Des;
    var Tags = req.body.Tags;
    
    db.mentor.find({RegistrationNumber:mentor},(err,res2)=>{
        if(res2.length !== 0){
            var tags1 = res2[0].Tags
            if (tags1.length !== 0) {
                Tags += tags1
            }
            db.mentor.updateOne({RegistrationNumber:mentor}, {$set:{Tags:Tags, Description: Des}}, (err1, res3) => {
                if(err1) {
                    console.log(err1)
                }
                else {
                    db.mymentors.updateMany({mentor:mentor},{$set:{tags:Tags, Description: Des}},(err2,res4)=>{
                        if(err2){
                            console.log(err2)
                        }
                        else{
                            res.send({message:"Your details have been updated."})
                        }
                    })
                }
            })
        }
        else{
            res.send({message:"Please register as a mentor before updating."})
        }
    })
})

app.post('/ismentor',(req,res)=>{
    var mentor = req.body.mentor
    db.mentor.find({RegistrationNumber:mentor},(err,res1)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(res1)
        }
    })
})

app.post('/getcontacts',(req,res)=>{
    var mentee = req.body.mentee
    db.mymentors.find({$or:[{mentor:mentee,status:"Accepted"},{mentee:mentee,status:"Accepted"}]},(err,res1)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(res1)
        }
    })
})

app.post('/pdelete',(req,res)=>{
    var regdno = req.body.RegistrationNumber
    db.mentor.remove({RegistrationNumber:regdno},(err,res1)=>{
        if(err){
            console.log(err)
        }
        else if(res1.n == 0){
            res.send({message:"You are not a mentor to delete your account."})
        }
        else{
            db.mymentors.remove({mentor:regdno},(err1,res2)=>{
                if(err1){
                    console.log(err1)
                }
                else{
                    res.send({message:"Your mentor account has been succesfully deleted."})
                }
            })
        }
    })
})

//___________________________End_____________________________________________

const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});

