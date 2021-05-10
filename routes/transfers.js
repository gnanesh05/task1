const express =  require('express');
const router = express.Router();
const Transfer = require("../models/transfer.js");

router.get("/",(req,res)=>{
	Transfer.find({}, (err, transfers)=>{
		if(err)
			console.log(err);
		
		if(transfers)
			{
				res.render("transactions",{transfers: transfers});
			}
	})
});



module.exports = router;