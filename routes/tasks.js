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
	});
});

//Save a Task 
router.post('/task', function(req, res, next){
	var task = req.body;
	if(!task.title || !(task.isDone + '')){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	} else {
		db.tasks.save(task, function(err, task){
			if(err){
				res.send(err);
			} else {
				res.json(task);
			}
		});
	}
});

//Delete a Task 
router.delete('/task/:id', function(req, res, next){
	db.tasks.remove({_id: mongojs.ObjectId(req.params)}, function(err, task){
		if(err){
			res.send(err);
		} else {
			res.json(task);
		}
	}); 
});


//Update
router.put('/task/:id', function(req, res, next){
	var task = req.body;
	var updTask = {};

	if(task.isDone){
		updTask.isDone = task.isDone;
	}
	if(task.title){
		updTask.title = task.title;
	}

	if(!updTask){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	} else {
		db.task.update({_id: mongojs.ObjectId(req.params.id)}, updTask, {}, function(err, task){
			if(err){
				res.send(err);
			} else {
				res.json(task);
			}
		});
	}	
});

module.exports = router;