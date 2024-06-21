const mongoose = require('mongoose')

const HrSchema = new mongoose.Schema({
    hr_id:{
        type:Number,
        required:true
    },
    hr_name:{
        type:String,
        required: true
    },
    hr_department:{
        type:String,
        required: true
    },
    hr_phonenumber:{
        type:Number,
        required: true
    },
    
},{
    timestamps:true
})


module.exports = mongoose.model('HrSchema',HrSchema)