const express = require('express')
const router = express.Router()
const {createCollege,getDetails} = require('../controllers/collegeController')
const {createIntern} = require ('../controllers/internController')


//============================================ creating college api ==========================================
router.post('/functionup/colleges',createCollege)
router.get('/functionup/collegeDetails',getDetails)


//====================================== creating interns api =============================================
router.post('/functionup/interns',createIntern)





module.exports = router