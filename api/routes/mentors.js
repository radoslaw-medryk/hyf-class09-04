const express = require("express");
const router = express.Router();

var { Validator, ValidationError } = require('express-json-validator-middleware');
var validator = new Validator({allErrors: true});
var validate = validator.validate;

const Mentors = require("../data/Mentors.js");
const hyf_mentors = new Mentors("./data/mentors.json");  

/****** Mentors Route  ******/
router.route('/mentors')  
  .get((req, res) => { 
    // get mentors: - GET http://localhost:<3000 or env port num>/api/mentors?startsWith=<letter here>      
      const allMentors = hyf_mentors.getAllMentors();
      if(req.query.startsWith) {
          const firstLetter = req.query.startsWith; 
          const foundMentors = allMentors.filter(q => q.name.toLowerCase().startsWith(firstLetter.toLowerCase()));
          if (foundMentors.length > 0) {
              res.status(201);
              res.send(foundMentors);  
          } else {
              res.status(400);
              res.send(`not found mentors with names starting with: '${req.query.startsWith.toUpperCase()}'`)
          }
      } else if(req.query.name) {
         // get mentors (by `name`) - GET http://localhost:<3000 or env port num>/api/mentors?name=<mentorName here>
          const mentor = hyf_mentors.getMentorByName(req.query.name);         
          if(!mentor){
              res.status(400);
              res.send(`mentor does not exist: '${req.query.name}'`);
          } else {
              res.status(201);
              res.send(mentor);
          }
      } else {
        // get all mentors        
        if (allMentors.length > 0) {    
           res.status(201);
           res.send(allMentors);
        } else {
          res.status(500);
          res.send(`sorry can't find mentors in data file!`);  // no mentor found in mentor.json data file
        }
      }
   })   
  .post((req, res) => {  
       // add new mentor: - POST http://localhost:<3000 or env port num>/api/mentors/<new mentor as JSON > 
      if (hyf_mentors.addNewMentor(req.body)) {
        res.status(201);
        res.send(`mentor mentor added: '${req.body.name}'`);
      } else {
        res.status(400);
        res.send(`failed to add mentor: '${req.body.name}'`);
      }  
  })     
  .put((req, res) => {  
      // edit mentor: - PUT http://localhost:<3000 or env port num>/api/mentors/<edited mentor as JSON>  
      if(hyf_mentors.editMentors(req.body)) {
        res.status(201);
        res.send(`mentor updated successfully: '${req.body.name}'`);
      }else{
        res.status(400);
        res.send(`mentor not found: '${req.body.name}'`);
      }      
  })
  .delete((req, res) => {
    // delete mentor: - DELETE http://localhost:<3000 or env port num>/api/mentors?name=<deleted mentorName> 
    if (hyf_mentors.deleteMentors(req.query.name)) {
       res.status(201);
       res.send(`mentor deleted successfully: '${req.query.name}'`);
    } else {
      res.status(400);
      res.send(`mentor not found: '${req.query.name}'`);
    }
  });

module.exports = router;
