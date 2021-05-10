const mongoose = require('mongoose');

const TransferSchema = new mongoose.Schema({
	sender:{
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		name:{
			type: String,
			required: true
		}
	},
	receiver:{
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		name:{
			type: String,
			required: true
		}
		
	},
	amount:{
		type: Number,
		required: true,
	}
	
});

module.exports = mongoose.model("Transfer",TransferSchema);