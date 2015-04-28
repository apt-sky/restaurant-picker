exports.getAll = function(req, res) {
	res.send([{name:'Thai Frisco'}, {name:'Chennai Cafe'}, {name:'Chopsticks'}]);
};

exports.getById = function(req, res) {
	res.send({id:req.params.id, name:"Thai Frisco Being Returned"});
};
