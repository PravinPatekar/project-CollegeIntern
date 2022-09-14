const express = require('express')
const router = express.Router()
const {createCollege,getDetails} = require('../controllers/collegeController')
const internController = require('../controllers/internController')


router.get('/functionup/collegedetails',getDetails)
router.post('/functionup/colleges',createCollege)



router.post('/functionup/interns', internController.createIntern)




module.exports = router