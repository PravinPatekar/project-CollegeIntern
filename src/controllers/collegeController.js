const axios = require('axios')
const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')



const nameRegex = /^[a-zA-Z]+$/i

//============================================ creating a college ==========================================
const createCollege = async function (req, res) {
    try {
        if (Object.keys(req.query).length === 0) {

            const data = req.body
            //================ if no data is provided in body ================================
            if (Object.keys(data).length == 0) {
                return res.status(400).send({ status: false, message: "Please Provide Some Data To Create !!" })
            }
            //==================== if no name is provided =======================================
            if (!data.name) {
                return res.status(400).send({ status: false, message: "Please Provide Name !!" })
            }
            //======================== name should be unique ===================================
            const repeatedName = await collegeModel.findOne({ name: data.name });
            if (repeatedName) {
                return res.status(400).send({ status: false, message: "Name Already Exists..!!" });
            }
            //========================= name is of invalid format ====================================
            if (!data.name.match(nameRegex)) {
                return res.status(400).send({ status: false, message: "invalid format of name !!" })
            }
            //============================== fullname not provided ===================================
            if (!data.fullName) {
                return res.status(400).send({ status: false, message: "Please Provide fullName !!" })
            }
            //=============================== logo link is not provided ===============================
            if (!data.logoLink) {
                return res.status(400).send({ status: false, message: "Please Provide logoLink !!" })
            }

            //=========================== if logo link is not correct =================================
            let correctLink = false
            await axios.get(data.logoLink)
                .then((res) => {
                    if (res.status == 200 || res.status == 201) {
                        if (res.headers["content-type"].startsWith("image/"))
                            correctLink = true;
                    }
                })
            .catch((error) => { correctLink = false })

            if (correctLink == false) {
                return res.status(400).send({ status: false, message: "Provide correct Logo Link !!" })
            };

            // ============================ if logo link is duplicate ==================================
            let repeatedlogoLink = await collegeModel.findOne({ logoLink: data.logoLink });
            if (repeatedlogoLink) {
                return res.status(400).send({ status: false, message: `Logo Link already exists !!` });
            }
            //===================================== creating a college data ==============================
            let collegeData = await collegeModel.create(data)
            let newData = { name: collegeData.name, fullName: collegeData.fullName, logoLink: collegeData.logoLink, isDeleted: collegeData.isDeleted }
            return res.status(201).send({ status: true, data: newData })


        }
        else {
            return res.status(400).send({ status: false, message: "Invalid request,do not provide data in query params !!" })
        }

    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}





//====================================getting college and interns =======================================

const getDetails = async function (req, res) {
    try {
        obj = { isDeleted: false };
        const name = req.query.collegeName;
        //============================ if filters are not provided ==================================
        if (!name) {
            return res.status(400).send({ status: false, message: "Please Provide some Filters !!" })
        }
        if (name) { obj.name = name }

        let getdata = await collegeModel.findOne(obj)
        //=========================== if college does not exist or deleted ============================
        if (!getdata) {
            return res.status(400).send({ status: false, message: "College does not exist !!" })
        }
        let internsData = await internModel.find({ collegeId: getdata._id, isDeleted: false }).select({ _id: 1, name: 1, email: 1, mobile: 1 })
        //============================ if no intern is not found ========================================
        if (internsData.length == 0) {
            return res.status(400).send({ status: false, message: "No intern found in this college !!" })
        }
        return res.status(200).send(
            {
                status: true,
                data: {
                    name: getdata.name,
                    fullName: getdata.fullName,
                    logoLink: getdata.logoLink,
                    interns: internsData
                }
            })

    }
    catch (error) {
        return res.status(500).send(error.message)
    }
}






module.exports = { createCollege, getDetails }