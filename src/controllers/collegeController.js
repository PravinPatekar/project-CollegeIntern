const axios = require('axios')
const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')




const nameRegex = /^[a-zA-Z]+$/i

//============================================ creating a college ==========================================
const createCollege = async function (req,res){
    try{
        if(Object.keys(req.query).length===0){
             
            const data = req.body
            //================ if no data is provided in body ================================
            if (Object.keys(data).length == 0) {
                return res.status(400).send({ status: false, msg: "Please Provide Data" })
            }
            //==================== if no name is provided =======================================
            if (!data.name) {
                return res.status(400).send({ status: false, msg: "Please Provide Name" })
            }
            //======================== name should be unique ===================================
            const repeatedName = await collegeModel.findOne({ name: data.name });
            if (repeatedName) {
                return res.status(400).send({ status: false, msg: "Name Already Exists..!" });
            }
            //========================= name is of invalid format ====================================
            if (!data.name.match(nameRegex)) {
                return res.status(400).send({ status: false, msg: "invalid format of name" })
            }
            //============================== fullname not provided ===================================
            if (!data.fullName) {
                return res.status(400).send({ status: false, msg: "Please Provide fullName" })
            }
            //=============================== logo link is not provided ===============================
            if (!data.logoLink) {
                return res.status(400).send({ status: false, msg: "Please Provide logoLink" })
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

            if (correctLink == false){
             return res.status(400).send({ status: false, message: "Provide correct Logo Link" })
            };

            // ============================ if logo link is duplicate ==================================
            let repeatedlogoLink = await collegeModel.findOne({ logoLink: data.logoLink });
            if (repeatedlogoLink) {
                return res.status(400).send({ status: false, msg: `Logo Link already exists!` });
            }
            //===================================== creating a college data ==============================
            let collegeCreation = await collegeModel.create(data)
            return res.status(201).send({ status: true, data: collegeCreation})


        }
        else{
            return res.status(400).send({status:false,msg:"Invalid request,do not provide data in query params."})
        }

    }
    catch(error){
        return res.status(500).send({ status: false, msg: err.message })
    }
}



















module.exports = {createCollege}