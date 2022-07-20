var express=require('express');
var router=express.Router();
var userModel=require.main.require('./models/user-model');
var index=require.main.require('./models/index');



router.get('/useredit/:username?',function(req,res){
	var data={
		username: req.params.username
	};
	userModel.useredit(data,function(result){
		res.render('./user/editprofile',{result:result});
	});
});
router.post('/useredit/:username?',function(req,res){
	var data={
		username: req.params.username,
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		address: req.body.address
	};
	userModel.userprofileupdate(data,function(valid){
		if(valid)
			{
				res.redirect('/user/user');
			}
		else
			{
				res.redirect('/error');
			}
	});
});
router.get('/broughthistory/:id?',function(req,res){
	var data={
		id: req.params.id,
	};
	userModel.broughthistory(data,function(result){
		if(result)
			{
				res.render('./user/broughthistory',{result:result});
			}
		else
			{
				res.render('/error/error');
			}
	});
});
router.all('/user',function(req,res){
	var data={
		username: req.session.loggedUser
	}
	userModel.user(data,function(result){
		if(result)
		{
			res.render('./user/userprofile',{result: result});
		}
		else
		{
			res.redirect('/error');
		}
	});
});
module.exports=router;

