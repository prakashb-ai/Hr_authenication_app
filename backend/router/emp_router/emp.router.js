const express = require('express')
const router = express.Router()
const EmpSchema = require('../../models/emp_models/emp.models')

router.post('/api/emp/post', async (req, res) => {
    const EmpData = new EmpSchema({
        emp_name: req.body.emp_name,
        emp_id: req.body.emp_id,
        emp_phonenumber: req.body.emp_phonenumber,
        emp_department: req.body.emp_department,
        emp_hr_id: req.body.emp_hr_id
    })
    const saveData = await EmpData.save()
    if (saveData) {
        return res.status(201).json({ message: "data created", data: saveData })
    }
    else {
        return res.status(400).json({ message: "data not created" })
    }
})

router.get('/api/emp/get', async (req, res) => {
    try {
        const getData = await EmpSchema.find().populate('emp_hr_id')
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

router.get('/api/emp/get/:id', async (req, res) => {
    try {
        const getData = await EmpSchema.findById(req.params.id).populate('emp_hr_id')
        if (getData) {
            return res.status(200).json({ message: "data was found", data: getData })
        }
        else {
            return res.status(404).json({ message: "data not found" })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server Error" })
    }
})


router.put('/api/emp/update/:id', async (req, res) => {
    try {
        const updateData = await EmpSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })

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



router.delete('api/emp/delete/:id', async (req, res) => {
    try {
        const deleteData = await EmpSchema.findById(req.params.id)
        if (deleteData) {
            return res.status(200).json({ message: "data deleted", data: deleteData })
        }
        else {
            return res.status(400).json({ message: "data was not deleted" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server Error" })
    }
})

router.delete('/api/emp/delete', async (req, res) => {
    try {
        const deletData = await EmpSchema.deleteMany()
        if (deletData) {
            return res.status(200).json({ message: "data deleted", data: deletData })
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