const express=require("express")

require("dotenv").config()
const nodemailer=require("nodemailer")
const ContactForm=require("../models/ContactForm")

const transporter=nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,

    auth:{
        user:"tenfashion13@gmail.com",
        pass:"qdrr iebk bums ilpe"
        // pass:process.env.PASS
    }
})

const contactPost=async(req,res)=>{
    const {fullName,email,Subject,message}=req.body;

    try{
        if(!fullName || !email || !Subject ){
            return res.status(401).json({message:"All fields are mandatory"})

        }
       const newContact=new ContactForm({
        fullName,email,Subject,message
       })
       await newContact.save();

       const mailOptions={
        from:"tenfashion13@gmail.com",
        to:email,
        subject:"Thank you for contacting us-Ten Fashion",
        html:`<div>Hello <strong>${fullName}</strong>,\n\nThank you for reaching out to us.Our team will contact you within 48 hours regarding your message. \n\nBest regards, \nTen Fashion Team\n\n This is what you have filled: <ul><li>Name: ${fullName}</li><li>Subject: ${Subject}</li></ul></div>`
       }
       transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.error("Error submitting email:",error);
            return res.status(500).json({error:"Failed to send email"})
        }else{
            console.log("Email sent:",info.response);
            
        }

       });
       return res.status(200).json({message:"Email sent successfully"})

    }catch(err){
console.log("Error in post contactForm",err);
return res.status(500).json({error:"Failed to submit contact form"})


    }
}

module.exports={contactPost};