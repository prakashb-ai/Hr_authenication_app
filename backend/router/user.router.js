const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Usermodel = require('../models/user.model')
const middleware = require('../middleware')

router.post('/api/register', async (req, res) => {
    try {
        const { username, email, phonenumber, password, confirmpassword } = req.body;
        const exit = await Usermodel.findOne({ email });
        if (exit) {
            return res.status(400).json({ message: "user already exits", data: exit });
        }
        if (password !== confirmpassword) {
            return res.status(400).json({ message: "password are not matching" });
        }
        const newUser = new Usermodel({
            username,
            email,
            phonenumber,
            password,
            confirmpassword
        })
        await newUser.save();
        return res.status(200).json({ message: "data was created", data: newUser })
    }
    catch (err) {
        console.log(err);
        return res.status(404).json({ message: "data was not created" })
    }
})

router.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const exit = await Usermodel.findOne({ email });
        if (!exit) {
            return res.status(400).json({ message: "user not found" });
        }
        if (exit.password !== password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        
        let payload = {
            user: {
                id: exit.id
            }
        }
        jwt.sign(payload, 'jwtSecret', { expiresIn: 3600000 },
            (err, token) => {
                if (err) throw err;
                return res.json({ token })
            }
        )
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "server Error" });
    }
})

router.get('/myprofile/:id',middleware, async (req, res) => {
    try {
        const exit = await Usermodel.findById(req.params.id);
        if (exit) {
            return res.status(200).json({message:"user  found",data:exit});

        }
        else{
            return res.status(404).json({message:"user not found",})
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({message:"server error"});
    }
})


router.get('/api/profile',async(req,res)=>{
    const getData = await Usermodel.find()
    if(getData){
        return res.status(200).json({message:"data found",data:getData})
    }
    else{
    return res.status(404).json({message:"data not found"})
    }
})


router.delete('/delete',async(req,res)=>{
    try{
        const deleteData = await Usermodel.deleteMany()
        if(deleteData){
            return res.status(200).json({message:"data deleted",data:deleteData})
        }
        else{
            return res.status(400).json({message:"data was not deleted"})
        }
    }catch(error){
            console.log(error)
    }
})

router.delete('/delete/:id',async(req,res)=>{
    try{
        const deleteData = await Usermodel.findById(req.params.id)
        if(deleteData){
            return res.status(200).json({message:"data deleted",data:deleteData})
        }
        else{
            return res.status(400).json({message:"data was not deleted"})
        }
    }catch(error){
            console.log(error)
    }
})



module.exports = router;