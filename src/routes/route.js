const express = require('express')
const router = express.Router()
const {createCollege} = require('../controllers/collegeController')



router.post('/functionup/colleges',createCollege)





module.exports = router