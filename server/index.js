const express = require("express");
const app = express();
const bosyParser=require("body-parser");
const mysql=require("mysql2");
const cors=require("cors");
const bodyParser = require("body-parser");

const db =mysql.createPool({
    host:"localhost",
    user:"root",
    password:"ashok20@1996",
    database:"crud_contact"
});


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/get" ,(req,res) => {
    const sqlGet= "SELECT * FROM student_db";
    db.query(sqlGet,(error,result)=>{
        res.send(result);
    });
});
app.post("/api/post",(req,res) =>{
    const { fname, lname, location,email,dob,education, about}=req.body;
    const sqlInsert=
    "INSERT INTO student-db(fname,lname,location,email,dob,educaion,about) VALUES (?,?,?)";
    db.query(sqlInsert,[fname,lname,location,email,dob,education,about],(error,result)=>{
        if(error){
            console.log(error);
        };
    });
});
app.delete("/api/delete/:id",(req,res) =>{
    const { id}=req.params;
    const sqlRemove=
    "DELETE FROM student_db WHERE id=?";
    db.query(sqlRemove,id,(error,result)=>{
        if(error){
            console.log(error);
        };
    });
});


app.get("/api/get/:id" ,(req,res) => {
    const { id }=req.params;
    const sqlGet= "SELECT * FROM student_db WHERE id=?";
    db.query(sqlGet,id,(error,result)=>{
        if(error){
            console.log(error)
        }
        res.send(result);
    });
})

app.put("/api/update/:id" ,(req,res) => {
    const { id }=req.params;
    const{fname,lname,location,email,dob,education,about}=req.body;
    const sqlUpdate= "UPDATE student_db SET fname =?,lname =?,location =?,email =?,dob =?,education =?,about =? WHERE id =?" ;
    db.query(sqlUpdate,[fname, lname, location, email, dob, education, about], (error,result)=>{
        if(error){
            console.log(error)
        }
        res.send(result);
    });
})

app.get("/",(req,res)=>{
   // const sqlInsert=
   // "INSERT INTO student_db (fname,lname,location,email,dob,education,about) VALUES('ashok','kumar','madurai','ashok@gmail','20/02/1996','mechanicalengineer','i am a good boy')";
   // db.query(sqlInsert,(error,result)=>{
     //   console.log("error",error);
      //  console.log("result",result);
       // res.send("Hello Express");
   // })
   
})

app.listen(5000,() =>{
    console.log("server is running on port 5000");
})