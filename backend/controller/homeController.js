const express = require('express');
const bcrypt = require('bcrypt');
const commonModels = require('../models/common-models');
const mongoose = require('mongoose');

const saltRounds = 10;

// COMMON FUNCTION

// function for encrypt string
function encryptStr(str) {

	return new Promise((resolve, reject) => {
		
	bcrypt.genSalt(saltRounds, function(err, salt) {
	    bcrypt.hash(str, salt, function(err, hash) {
	        resolve({'hash':hash});
	    });
	});
	})


}
// ends here ~ function for encrypt string

// function for match string with encrpted string (or hash)
function isEncrptionMatch(str,hash) {
	return new Promise((resolve, reject) => {
	    bcrypt.compare(str, hash, function(err, result) {
	    	console.log(result)
	    	resolve(result);
		});
	})
}
// ends here ~ function for match string with encrpted string (or hash)

// ENDS HERE ~ COMMON FUNCTION



exports.homePage = function(req,res,next){
	console.log(' it is working fine ');
	res.status(200).json({
		'message':'configuration is working fine'
	})

	
}

// for signup
exports.signup = async function(req,res,next){

	// read data from req
	const email = req.body.email;
	const fullname = req.body.fullName;
	const password = req.body.password;
	// ends here ~ read data from req

	// check email is already exists in database
	let userCount = 0;
	await commonModels.users.find({'email':email},(err,user)=>{
		// console.log(' err >> ',err);
		// console.log(' user >>',user.length);
		userCount = user.length;
	})
	// ends here ~  check email is already exists in database

	if(userCount == 1) {
		return res.status(400).json({
			'message-type':'error',
			'message':'E-Mail is Already Exists in Our Records. Please login your Account using your E-Mail'
		})
	}


	// encrypt password
	const encryptedPswd = await encryptStr(password);
	// ends here ~ encrypt password

	// insert data into user table
	commonModels.users.create({
		_id: mongoose.Types.ObjectId(),
		name: fullname,
		email: email,
		password:encryptedPswd['hash']
	},(err,user)=>{
		if(user) {
			// console.log(' user >> ',user);
			res.status(200).json({
				'message-type':'success',
				'message':'Your Account is Successfully Register in Our Records'
			})
		} else {
			// console.log(' err >> ',err);
			res.status(400).json({
				'message-type':'error',
				'message':'Error while Signup. Please try Again Later.'
			})
		}
	})
	// ends here ~ insert data into user table


	
}
// ends here ~ for signup

// for login
exports.login = async function(req,res,next){

	// read data from req
	const email = req.body.email;
	const password = req.body.password;
	// ends here ~ read data from req

	// check email is already exists in database
	let userDetail = {};
	await commonModels.users.findOne({'email':email},(err,user)=>{
		userDetail = user;
	})
	// ends here ~  check email is already exists in database

	// if email is not exists in user table
	if(userDetail == null || userDetail == undefined) {
		return res.status(404).json({
			'message-type':'error',
			'message':'E-Mail is Not Exists in Our Records. Please signup for Account using your E-Mail'
		})
	}
	// ends here ~ if email is not exists in user table

	const isAuthUser = await isEncrptionMatch(password,userDetail.password);

	if(isAuthUser) {
		res.status(200).json({
			'message-type':'success',
			'message':'Successfully Login into Account'
		})	
	} else {
		
	}

	
}


// ends here ~ for login
