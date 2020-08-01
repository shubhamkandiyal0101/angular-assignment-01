require('dotenv').config();
const { JWK: { None, generateSync, asKey }, JWT, JWS } = require('jose')


function isAuthenticated(req, res, next) {

	let authorizationHeader = req.headers['authorization'];

	// if authorization token is not provided (or provided blank or null) in header 
	if(authorizationHeader == undefined || authorizationHeader == null || authorizationHeader == '') {
		return res.status(403).json({
			'message-type':'error',
			'message':'Token is Not Valid. Please login first to Access this Resource'
		})
	}
	// ends here ~ if authorization token is not provided (or provided blank or null) in header 

	const headerToken = authorizationHeader.split(' ')[1];

	try {
		const decoded = JWT.verify(
			headerToken,
		  process.env.JWT_SECRET_KEY,
		)
		req.user = decoded;
		next();
	} catch(err) {
		return res.status(403).json({
			'message-type':'error',
			'message':'Token is Not Valid. Please login first to Access this Resource'
		})
	}

  // res.redirect('/');
}

module.exports = isAuthenticated;