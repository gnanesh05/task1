const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Transfer = require("../models/transfer");

router.get("/", (req,res)=>{
	User.find({}, (err, users)=>{
		if(err)
			console.log(err);
		
		if(users)
			{
				res.render("index",{users: users});
			}
	})
	
});

router.get("/:id",(req,res)=>{
	User.findById(req.params.id,(err,user)=>{
		if(err)
			console.log(err);
		
		if(user)
			{
				res.render("view",{user:user});
			}
	})
});


router.get("/:id/users",(req,res)=>{
	User.find({ _id: {$ne: req.params.id}},(err,users)=>{
		if(err)
			res.send(err.message);
		if(users)
			res.send(users);
	})
})




module.exports = router;