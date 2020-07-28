const express = require('express');

exports.homePage = function(req,res,next){

	console.log(' it is working fine ');

	res.status(200).json({
		'message':'json'
	})
}

