const express = require('express')
const router = express.Router()
const {createCollege,getDetails} = require('../controllers/collegeController')
const internController = require('../controllers/internController')



//================creating college=============//
router.post('/functionup/colleges',createCollege)

//===========geting the interns of a college============//
router.get('/functionup/collegedetails',getDetails)

//=============creating intern================//
router.post('/functionup/interns', internController.createIntern)

//============to handle wrong routes===================//
router.all('/*', function(req, res){
    res.status(404).send({
        status: false,
        message: "Make Sure Your Endpoint is Correct !!!"
    })
})


module.exports = router