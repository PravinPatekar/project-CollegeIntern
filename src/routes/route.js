const express = require('express')
const router = express.Router()
const internController = require('../controllers/internController')




router.post('/functionup/interns', internController.createIntern)




module.exports = router