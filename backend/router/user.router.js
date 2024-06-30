const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Usermodel = require('../models/user.model')
const middleware = require('../middleware')
const bcrypt = require('bcrypt')
const TaskSchema = require('../models/todo_model/task.model')
const EmpSchema = require('../models/emp_models/emp.models')

router.post('/api/register', async (req, res) => {
    try {
        const { username, email, phonenumber, password, confirmpassword } = req.body;
        const existingUser = await Usermodel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists', data: existingUser });
        }

        if (password !== confirmpassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Usermodel({
            username,
            email,
            phonenumber,
            password: hashedPassword,
            confirmpassword
        });

        await newUser.save();

        return res.status(200).json({ message: 'User created successfully', data: { ...newUser.toObject(), tasks: [] } });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Failed to create user', error });
    }
});

router.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Usermodel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const match = await bcrypt.compare(password, user.password);

        if (match) {
            const payload = { userId: user._id, email: user.email };
            const token = jwt.sign(payload, 'JWT_SECRET', { expiresIn: '1h' });

            const empData = await EmpSchema.findOne({ emp_hr_id: user._id });

            const tasks = empData ? await TaskSchema.find({ task_user_id: empData._id }) : [];

            return res.json({
                userId: user._id,
                email: user.email,
                empData,
                hasTasks: tasks.length > 0,
                tasks,
                token
            });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ message: "Server Error" });
    }
});

router.get('/api/profile', middleware,async (req, res) => {
    const getData = await Usermodel.find()
    if (getData) {
        return res.status(200).json({ message: "data found", data: getData })
    }
    else {
        return res.status(404).json({ message: "data not found" })
    }
})


router.delete('/delete', middleware,async (req, res) => {
    try {
        const deleteData = await Usermodel.deleteMany()
        if (deleteData) {
            return res.status(200).json({ message: "data deleted", data: deleteData })
        }
        else {
            return res.status(400).json({ message: "data was not deleted" })
        }
    } catch (error) {
        console.log(error)
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const deleteData = await Usermodel.findById(req.params.id)
        if (deleteData) {
            return res.status(200).json({ message: "data deleted", data: deleteData })
        }
        else {
            return res.status(400).json({ message: "data was not deleted" })
        }
    } catch (error) {
        console.log(error)
    }
})



module.exports = router;