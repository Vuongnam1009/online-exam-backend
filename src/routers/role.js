const role = require('../models/role');
const router = require('express').Router();

router.post('/role', async (req, res)=>{
const {name,permissions} = req.body;
console.log([permissions]);
    const data = await role.create({name,permissions});
    res.send({status:1,role:data});
})

module.exports = router;