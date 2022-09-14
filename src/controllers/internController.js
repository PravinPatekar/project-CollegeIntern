const internModel = require('../models/internModel')
const collegeModel = require('../models/collegeModel')




const createIntern = async function (req, res) {
    try {
        let data = req.body
        let { name, email, mobile, collegeName } = data

        //=========================== if data is entered in query params =================================
        if (Object.keys(req.query) != 0) {
            return res.status(400).send({ status: false, message: "Do not provide any filter !!" })
        }
        //================================if data is not provided in body ===============================
        if(!data){
            return res.status(400).send({ status: false, message: "please enter data to create intern." })
        }
        //============================== if name is not entered in body ================================
        if (!name) {
            return res.status(400).send({ status: false, message: "Name is mandatory !!" })
        }
        //=============================== to check if the name is of invalid format ==========================
        let Name = /^[a-zA-Z\s]+$/.test(name)
        if (!Name) {
            return res.status(400).send({ status: false, message: `${name} can be in alphabets only !!` })
        }
        //==================================== if e-mail is not entered in body =============================
        if (!email) {
            return res.status(400).send({ status: false, message: "E-mail is mandatory !!" })
        }
        //================================== to check if email is of invalid format ===========================
        let emailValid = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)    
        if (!emailValid) {
            return res.status(400).send({ status: false, message: `${email} is not a valid E-mail !!` })
        }
        //============================== if mobile no. os not entered in body ================================
        if (!mobile) {
            return res.status(400).send({ status: false, message: "Mobile is mandatory !!" })
        }
        //============================= if mobile no. is of in valid format =================================
        let mobileValid = /^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile) 
        if (!mobileValid) {
            return res.status(400).send({ status: false, message: `${mobile} is not a valid Mobile Number !!` })
        }
        //======================== if collegename is not entered in body ======================================
        if (!collegeName) {
            return res.status(400).send({ status: false, message: "Please provide the Name of Your College !!" })
        }
        //=============================== duplicate email =================================================
        let checkEmail = await internModel.findOne({ email: email })
        if (checkEmail) {
            return res.status(400).send({ status: false, message: `${email} already exists !!` })
        }
        //================================= duplicate mobile number ========================================
        let checkMobile = await internModel.findOne({ mobile: mobile })
        if (checkMobile) {
            return res.status(400).send({ status: false, message: `${mobile} already exists !!` })
        }
        //============================= if college does not exist =========================================
        let checkCollege = await collegeModel.findOne({ name: collegeName })
        if (!checkCollege) {
            return res.status(400).send({ status: false, message: `${collegeName} does not exist !!` })
        }
        //=================================== createing intern ==========================================
        req.body.collegeId = checkCollege._id
        let intern = await internModel.create(data)
        res.status(201).send({ status: true, data: intern })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }

}



module.exports = { createIntern }