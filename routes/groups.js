const express = require('express')
const router = express.Router()

router.get('/',(req,res,next)=>{
    res.render('groups/groups')
})
router.get('/create',(req,res,next)=>{
    res.render('groups/create')
})

module.exports = router