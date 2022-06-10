const groupPermission = require('../models/groupPermission');
const router = require('express').Router();

router.post('/groupPermissions/', async (req, res)=>{
const {name} = req.body;
    const data = await groupPermission.create({name});
    res.send({status:1,groupPermission:data});

})

module.exports = router;