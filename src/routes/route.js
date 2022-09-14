const express = require('express')
const router = express.Router()
const {createCollege} = require('../controllers/collegeController')
const internController = require('../controllers/internController')



router.post('/functionup/colleges',createCollege)



router.post('/functionup/interns', internController.createIntern)




module.exports = router