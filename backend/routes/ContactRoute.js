const express=require("express");
const { contactPost } = require("../controllers/ContactForm");

const router=express.Router();

router.post("/contactForm",contactPost)

module.exports=router;