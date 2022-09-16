const internModel = require('../models/internModel')
const collegeModel = require('../models/collegeModel')




const createIntern = async function (req, res) {
    try {
        let data = req.body
        let { name, email, mobile, collegeName } = data

        //=============================== if filters are provided ==========================================

        if (Object.keys(req.query).length != 0) {
            return res.status(400).send({ status: false, message: "Do not provide any filter !!" })
        }
        //================================if data is not provided in body ===============================
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "Please enter some data to create intern !!" })
        }
        //============================== if name is not entered in body ================================
        if (!name) {
            return res.status(400).send({ status: false, message: "Name is mandatory !!" })
        }
        //================================ to check the name format =======================================
        let Name = /^[a-zA-Z\s]+$/.test(name)
        if (!Name) {
            return res.status(400).send({ status: false, message: `${name} can be in alphabets only !!` })
        }
        if(!name.trim()){
            return res.status(400).send({ status: false, message: `Name can not be  an empty string !!` })
        }
        //================================== email is mandatory ===========================================
        if (!email) {
            return res.status(400).send({ status: false, message: "E-mail is mandatory !!" })
        }
        //================================== to check the email format ===================================
        let emailValid = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)
        if (!emailValid) {
            return res.status(400).send({ status: false, message: `${email} is not a valid E-mail !!` })
        }
        //================================ mobile is mandatory =========================================
        if (!mobile) {
            return res.status(400).send({ status: false, message: "Mobile is mandatory !!" })
        }
        //=============================== to check the mobile no. format =================================
        let mobileValid = /^[6-9]\d{9}$/.test(mobile)
        if (!mobileValid) {
            return res.status(400).send({ status: false, message: `${mobile} is not a valid Mobile Number !!` })
        }
        //==================================== college name is mandatory ==============================
        if (!collegeName) {
            return res.status(400).send({ status: false, message: "Please provide the Name of Your College !!" })
        }
        //================================ duplicate email =====================================================
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
        //=================================== creating intern ==========================================
        req.body.name = name.replace(/\s+/g,' ')
        req.body.collegeId = checkCollege._id
        let intern = await internModel.create(data)
        let Data = { name: intern.name, email: intern.email, mobile: intern.mobile, collegeId: intern.collegeId, isDeleted: intern.isDeleted }
        res.status(201).send({ status: true, data: Data })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }

}



module.exports = { createIntern }