const express = require("express");
const { contactPost, getAllContacts } = require("../controllers/ContactForm");

const router = express.Router();

router.post("/contactForm", contactPost);
router.get("/contactForm", getAllContacts);

module.exports = router;
