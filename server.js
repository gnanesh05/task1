const express =  require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const User = require("./models/user.js");
const Transfer =  require("./models/transfer.js");

require('dotenv').config();
app.use(express.static("public"));



var url = process.env.DATABASE_URL || "mongodb://localhost/bank";

mongoose
     .connect( url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
     .then(() => console.log( 'Database Connected' ))
     .catch(err => console.log( err ));

app.use(express.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.set("view engine","ejs");

const users = require("./routes/users.js");
const transfers = require("./routes/transfers.js");
app.use("/users",users);
app.use("/transactions", transfers);



app.get("/", (req, res)=>{
	res.sendFile(__dirname+ "/home.html");
})

app.get("/transfer",(req,res)=>{
	var id = req.query.id;
	User.find({_id:{$ne:id}},(err, users)=>{
	   if(err)
		   res.send(err.message);
	   if(users)
		   res.send({users:users});
	})
})
app.get("/money", async(req,res)=>{
	var id1 = req.query.id1;
	var id2 = req.query.id2;
	var amount = parseInt(req.query.amount);
	try
	{
	var user1 = await User.findById(id1);
	var user2 = await User.findById(id2);
	if(user1.balance >= amount)
		{
			user1.balance -= amount;
			user2.balance += amount;
			user1.save();
			user2.save();
			const entry =  new Transfer({
				sender:{
					id: user1._id,
					name: user1.name
				},
				receiver:{
					id: user2._id,
					name: user2.name
				},
				amount: amount
			});
			await entry.save();
			
			res.send({succ: "transaction successful", balance: user1.balance});
			
		}
	else
	  {
		res.send({err: "balance not suficient"});
		  
	  }
	}
	catch(err){
		console.log(err);
}
});



let port = process.env.PORT || 3000;
app.listen(port, () => {
console.log(`app listening at http://localhost:${port}`)

  });