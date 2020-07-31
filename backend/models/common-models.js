const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	_id: Schema.Types.ObjectId,
	name: {
		type: String,
		default: '',
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
})

exports.users = mongoose.model('users', userSchema);

