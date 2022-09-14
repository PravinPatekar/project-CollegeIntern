const validator = require('validator')
const internModel = require('../models/internModel')
const collegeModel = require('../models/collegeModel')

const createIntern = async function (req, res) {
    let data = req.body
    let { name, email, mobile, collegeName } = data

    //---------------------------------------validations-------------------------------------------------------------------------------//
    if (!name) {
        res.status(400).send({ status: false, message: "Name is mandaotory !!" })
    }
    let Name = /^[a-zA-Z ]+$/.test(name)
    if(!Name){
        res.status(400).send({ status: false, message: `${name} can be in alphabets only !!` })
    }

    if (!email) {
        res.status(400).send({ status: false, message: "E-mail is mandaotory !!" })
    } if (!validator.isEmail(email)) {
        res.status(400).send({ status: false, message: `${email} is not a valid E-mail !!` })
    }

    if (!mobile) {
        res.status(400).send({ status: false, message: "Mobile is mandaotory !!" })
    } if (!validator.isMobilePhone(mobile)) {
        res.status(400).send({ status: false, message: `${mobile} is not a valid Mobile Number !!` })
    }

    if(!collegeName){
        res.status(400).send({ status: false, message: "Please provide the Name of Your College !!" })
    }

    let checkEmail = await internModel.findOne(email)
    if(!checkEmail){
        res.status(400).send({status: false, message: `${email} already exists !!`})
    }

    let checkMobile = await internModel.findOne(mobile)
    if(!checkMobile){
        res.status(400).send({status: false, message: `${mobile} already exists !!`})
    }

    let checkCollege = await collegeModel.findOne(collegeName)
    if(!checkCollege){
        res.status(400).send({status: false, message: `${collegeName} does not exist !!`})
    }
    res.body.collegeId = checkCollege._id
    let intern = await internModel.create(data)
    res.status(400).send({status: true, data: intern})

}