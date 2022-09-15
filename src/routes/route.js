const express = require('express')
const router = express.Router()
const { createCollege, getDetails } = require('../controllers/collegeController')
const { createIntern } = require('../controllers/internController')


//============================================ creating college api ==========================================
router.post('/functionup/colleges', createCollege)
//=========================== geting the interns of a college =================================================
router.get('/functionup/collegeDetails', getDetails)



//====================================== creating interns api =============================================
router.post('/functionup/interns', createIntern)



//=========================== if the endpoint are correct or not ==========================================
router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        message: "The Path you are requesting is not available !!"
    })
})


module.exports = router