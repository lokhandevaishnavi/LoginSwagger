const mongoose = require ("mongoose");
const { validationResult } = require('express-validator');
const userModel = require("../models/user")

exports.getUser = (req,res,next) => {
    const currentPage = req.query.page || 1;
    const perPage = 6;
    return userModel.find()
    .countDocuments()
    .then(count =>{
        console.log({ count })
        userModel.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
        .then(users => {
            res.status(200).json({
                message: "User Fetched",
                users: users,           
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err)
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    })
};

exports.postUser = (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            errors: errors.array()
        })
    }
    const userName = req.body.userName;
    const password = req.body.password;
    
    const user = new userModel({
        userName : userName,
        password: password
    });
    user.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "User Added Successfully!",
        })
    })
    .catch(err => {
        console.log(err)
    })

},

exports.updateUser = (req, res, next) => {
    userModel.findByIdAndUpdate(
      
        req.params.userId,
        
        req.body,
        
        { new: true },
        

    ).then(user => {
        if (!user) {
            const error = new Error("No User Found");
            error.statusCode = 404;
            throw error
        }
        res.status(200).json({
            message: "User Item updated succesfully",
            user: user
        })
    }).catch(err => {
        console.log(err)

        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })

},

exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;

    userModel.findByIdAndRemove(userId, function (err) {
        if (err) return next(err);
        res.status(200).json({
            message: "User deleted succesfully",
        })
    })


}

