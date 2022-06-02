const express = require('express');
const router= express.Router();
const AccountModel = require('../models/accounts')
 const PAGE_SIZE = 2

router.get('/', (req, res)=>{
    var page = req.query.page
    if(page){
        page = parseInt(page)
        var skip = (page - 1)* PAGE_SIZE
        AccountModel.find({})
        .skip(skip)
        .limit(PAGE_SIZE)
        .then(data=>{
            res.json(data);
        })
        .catch(err=>{
            res.status(500).json('Lỗi sever')
        })
    }else{
        AccountModel.find({})
        .then(data=>{
            res.json(data);
        })
        .catch(err=>{
            res.status(500).json('Lỗi sever')
        })
    }

})
router.post('/', (req, res)=>{
    const username = req.body.username
    const password = req.body.password
    AccountModel.create({
        username: username,
        password: password
    })
    .then(data => {
        res.json('Tạo tài khoản thành công')

    })
    .catch(err => {
        res.status(500).json('Lỗi',err)
    })

})
router.put('/:id', (req, res)=>{
 var id =   req.params.id
 var newPassword= req.body.newPassword
 AccountModel.findByIdAndUpdate(id,{
     password: newPassword
 })
 .then(data =>{
     res.json('Cập nhật thành công')

 })
 .catch(err =>{
    res.status(500).json('Lỗi',err)
 })

})
router.delete('/:id', (req, res)=>{
    var id = req.params.id
    AccountModel.deleteOne({_id:id})
    .then(
        res.json('Xóa Thành công')
    )
    .catch(err => {
        res.status(500).json('Lỗi',err)
    })

})


module.exports = router