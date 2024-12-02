const mongoose=require('mongoose');
const contactSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    Subject:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        
    }
})

module.exports=mongoose.model("ContactForm",contactSchema)