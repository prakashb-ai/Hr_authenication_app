const mongoose = require('mongoose')

const EmpSchema = new EmpSchema.Schema({
    emp_name:{
        type:String,
        required: true
    },
    emp_id:{
        type:Number,
        required: true
    },
    emp_phonenumber:{
        type: Number,
        required: true
    },
    emp_department:{
        type: String,
        required: true
    },
    emp_hr_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HrSchema'
    }

},{
    timestamps:true,

})


module.exports = mongoose.model('EmpSchema',EmpSchema)