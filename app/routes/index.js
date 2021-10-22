module.exports = function(application){
	application.get('/',function(req,res){
		application.app.controlers.index.home(application,req,res);
	});
}