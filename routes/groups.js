const express = require('express')
const router = express.Router()

router.get('/',(req,res,next)=>{
    res.render('groups/groups')
})
router.get('/',(req,res,next)=>{
    res.sender('groups/listgroups')
})

module.exports = router