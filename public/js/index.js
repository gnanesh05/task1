$(document).ready(()=>{

 
	$("#transfer").click(function()
	{
	    var id = $("#transfer").val();	
		 $.ajax({
		   url: "/transfer",
		   contentType: "application/json",
			 data:{
				 id: id
			 },
			 success: (response)=>{
				 console.log(response.users[0].name);
				 var group = $("#transfer-group");
				 group.html('');
				 
				 if(response.users.length>0)
					 {
						 var form = document.createElement('form');
						 var div = document.createElement('div');
						 var label1 = document.createElement('label');
						 label1.className = "input-group-text"
						 label1.appendChild(document.createTextNode("user"));
						 var label2 = document.createElement('label');
						 label2.className = "input-group-text"
						 label2.appendChild(document.createTextNode("amount"));
						 div.className = "col-auto";
						 form.id = "money-form";
						 form.action ='';
						 
						
						 group.append(div);
						 
						 var div1  = document.createElement('div');
						 var input1 = document.createElement('input');
						 var select =  document.createElement('select');
						 var options = [];
						 var option1 = document.createElement('option');
						  option1 = new Option("Select User",0);
						 console.log(response.users);
						 //option1.disabled= true;
						 select.appendChild(option1);
                        for(let i=0; i<response.users.length; i++)
							{
							   options[i] =  document.createElement('option');
							   options[i] = new Option(response.users[i].email,response.users[i]._id);
							   select.appendChild(options[i]);
								
							}
						 select.className = "form-select";
						 select.id = "select-user";	 
								 form.className = "row g-3";
								 div1.className="col-auto";
						         
								 div1.appendChild(select);
						        
								 form.appendChild(div1);
								 var div2  = document.createElement('div');
								 var input2 = document.createElement('input');
						         
								  input2.type = "number";
								  div2.className="col-auto";
								  input2.className="form-control";
								  input2.id = "amount";
								  input2.placeholder = "Rs.";
						          input2.required = true;
								  div2.appendChild(input2);
						         
								  form.appendChild(div2);
								  var div3  = document.createElement('div');
								  var input3 = document.createElement('input');
						 
								  input3.type = "submit";
								  div3.className ="col-auto";
								  input3.className = "btn btn-primary mb-3";
						          input3.id = "submit";
								  input3.value = 'Send';
						          div3.appendChild(input3);
								  form.appendChild(div3);
						          
								    input3.onclick = (event)=>{
										event.preventDefault();
									
										var id1 = $("#user").val();
	                                    var id2 = select.value;
	                                    var amount = input2.value;
										 $.ajax({
										 url: "/money",
										 contentType : "application/json",
										 data:{
										 'id1': id1,
										 'id2': id2,
										 'amount': amount
										     },
										 success: (response)=>{
										 console.log(response);
										 alert(response.succ||response.err);
										 $("#balance").text(response.balance);
										 form.innerHTML = " ";
										 }
											 
										 });
									}
								  div3.appendChild(input3);
								  form.appendChild(div3);
								 
						          
								group.append(form);
							
							 
							  group.append("<br>")
			

							
						 
					 }
			 }
			 
			 
		   })
	});



	
});
