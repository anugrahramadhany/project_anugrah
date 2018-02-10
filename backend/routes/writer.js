const express = require("express");
const writerdata = require("../models/writer");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", (req, res)=>{
    let newObj = new writerdata({
        username : req.body.username,
        password : req.body.password,
        email: req.body.email,
        firstname : req.body.firstname,
        lastname : req.body.lastname
    });

    newObj.save((error)=>{
        if(error){
            res.status(500).send(error);
        }else{
            res.json(newObj);
        };
    });
});

router.post("/login", (req, res)=>{


    writerdata.findOne({ username : req.body.username, password : req.body.password},(error ,result)=>{
        if(error){
            res.status(500).json(error);
        }
        else if(!result){
            res.status(404).json({message:"User not found !"})
        }else{
            const payload ={
                id:result._id,
                username:result.username
            }
            const token = jwt.sign(payload, "secretkey", {expiresIn:37000});
            res.json({token:token});
        };
    });
});


router.get("/", (req, res) => {
    writerdata.find({}, (error, result) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json(result);
        }
    })
})


router.delete("/:id", (req, res) => {
    
            writerdata.findByIdAndRemove(req.params.id, (error, result) => {
                if (error) {
                    res.status(500).json(error);
                }
                else {
                    res.json({ message: "Data deleted" })
                }
            });
    
        });

module.exports = (function (){
    return router;
})();