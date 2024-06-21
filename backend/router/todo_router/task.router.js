const express = require('express')
const router = express.Router()
const TaskSchema = require('../../models/todo_model/task.model')

router.post('/api/post/task', async (req, res) => {
    try {
        const TaskData = new TaskSchema({
            task_id: req.body.task_id,
            task_title: req.body.task_title,
            task_description: req.body.task_description,
            task_user_id: req.body.task_user_id
        })
        const saveData = await TaskData.save()
        if (saveData) {
            return res.status(201).json({ message: "data created", data: saveData })
        }
        else {
            return res.status(400).json({ message: "data not created" })
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal Server Error" })
    }

})

router.get('/api/get/task', async (req, res) => {
    try {
        const getData = await TaskSchema.find().populate('task_user_id')
        if (getData) {
            return res.status(200).json({ message: "data found", data: getData })
        }
        else {
            return res.status(404).json({ message: "data not found" })
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server Error" })
    }
})

router.get('/api/get/task/:id', async (req, res) => {
    try {
        const getData = await TaskSchema.findById(req.params.id).populate('task_user_id')
        if (getData) {
            return res.status(200).json({ message: "data found", data: getData })
        }
        else {
            return res.status(404).json({ message: "data not found" })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server Error" })
    }
})


router.put('/api/update/task/:id', async (req, res) => {
    try {
        const updateData = await TaskSchema.findByIdAndUpdate(req.params.id,req.body, { new: true })
        if (updateData) {
            return res.status(200).json({ message: "data updated", data: updateData })
        }
        else {
            return res.status(404).json({ message: "data not updated" })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server Error" })
    }
})

router.delete('/api/delete/task', async (req, res) => {
    try {
        const deleteData = await TaskSchema.deleteMany()
        if (deleteData) {
            return res.status(200).json({ message: "data deleted", data: deleteData })
        }
        else {
            return res.status(400).json({ message: "data was not deleted" })
        }
    } catch (err) {
        console.log(error)
        return res.status(500).json({ message: "Internal server Error" })
    }
})

module.exports = router