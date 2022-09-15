const express = require('express')
const router = express.Router()
const { createCollege, getDetails } = require('../controllers/collegeController')
const { createIntern } = require('../controllers/internController')


//============================================ creating college api ==========================================
router.post('/functionup/colleges', createCollege)
router.get('/functionup/collegeDetails', getDetails)

//===========geting the interns of a college============//
router.get('/functionup/collegedetails',getDetails)

//====================================== creating interns api =============================================
router.post('/functionup/interns', createIntern)


//============to handle wrong routes===================//
router.all('/*', function(req, res){
    res.status(404).send({
        status: false,
        message: "Make Sure Your Endpoint is Correct !!!"
    })
})


module.exports = router