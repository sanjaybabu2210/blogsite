var express 	= require("express"),
 	app 		= express(),
 	path = require('path'),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	Blog = require("./models/blogs");


	
	
	
	
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public/')));


mongoose.connect('mongodb+srv://sanjayAshwat:tecwebsite@cluster1.rbufv.mongodb.net/Blogs?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log('Connected to DB!!');
}).catch(err => {
	console.log('ERROR:', err.message);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

	
app.get("/newblog", function(req, res){
	res.render("newblog.ejs");
});


app.get("/",function(req,res){

	Blog.find({},function(err,blogs){
		if(err){
			console.log(err.message);
		}else{
			res.render("blogs.ejs",{blog:blogs})
		}
	})
	
})
app.get("/blogpost/:id",function(req,res){

	var id = req.params.id;
	Blog.findById(id,function(err,blogs){
		if(err){
			console.log(err.message);
		}else{
			console.log(blogs);
			res.render("blogpage.ejs",{blog:blogs})
		}
	})
	
})
app.post('/blogpost',function(req,res,next){
	var title= req.body.title;
	var description = req.body.description;
	var mhead = req.body.mhead;
	var subhead = req.body.subhead
	var blog = { title:title, description:description,mhead:mhead,subhead:subhead}
		
		Blog.create(blog, function(err,newlyCreated){
		if(err){
			req.flash('error', err.message);
			console.log(newlyCreated);
	
		}else{
			
			console.log(newlyCreated);
			res.redirect('/');
		}
	
	
});
});


app.listen(process.env.PORT || 3000, function(){
	console.log("Server Started!!!");
})

