var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('mongodb://jesse:jesse@ds053156.mlab.com:53156/jlab', ['tasks'])

//Get All Tasks
router.get('/tasks', function(req, res, next){
	// res.send('Task Api');
	db.tasks.find(function(err, tasks){
		if(err){
			res.send(err);
		} else {
			res.json(tasks);
		}
	});
});
//Get a Single Task
router.get('/task/:id', function(req, res, next){
	db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
		if(err){
			res.send(err);
		} else {
			res.json(task);
		}
	})
})
module.exports = router;