const express = require('express')
const router = express.Router()
const EmpSchema = require('../../models/emp_models/emp.models')
const middleware = require('../../middleware')

router.post('/api/emp/post', middleware, async (req, res) => {
    try {
        const { emp_name, emp_id, emp_phonenumber, emp_department } = req.body;
        const newEmp = new EmpSchema({
            emp_name,
            emp_id,
            emp_phonenumber,
            emp_department,
            emp_hr_id: req.user.id
        });

        const saveData = await newEmp.save();
        return res.status(201).json({ message: "Employee created", data: saveData });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/api/emp/get', middleware, async (req, res) => {
    try {
        const empData = await EmpSchema.find({ emp_hr_id: req.user.id });
        return res.status(200).json({ message: "Employee data found", data: empData });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
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