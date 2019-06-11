const express = require("express");
const router = express.Router();

const AlreadyExistsError = require("../errors/AlreadyExistsError");

var { Validator, ValidationError } = require('express-json-validator-middleware');
var validator = new Validator({allErrors: true});
var validate = validator.validate;

const courseSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string'
        },
        duration: {
            type: 'number'
        }
    },
    required: ['name', 'duration'],
    additionalProperties: false
  };

// Insert modules/files containing: 'courses'
const Courses = require("../data/Courses.js");
const hyf_courses = new Courses("./data/courses.json"); 

/****** Courses Route  ******/
router.route('/courses')
    // get courses: - GET http://localhost:<3000 or env port num>/api/courses?name=<course name here>
  .get((req, res) => {
    // get courses (by `name`)
      if(req.query.name) {
        const course = hyf_courses.getCourseByName(req.query.name);   
        if(course !== undefined){
          res.send(course);
        } else {
          res.status(400);
          res.send("Doesn't exist")
        }      
      } else {
        // get all courses including mentors 
          const allCourses = hyf_courses.getList();     
          console.log(allCourses);        
          if (allCourses.length > 0) {    
             res.send(allCourses);
          } else {
            res.status(500);
            res.send(`sorry can't find courses in data file!`);  // no courses found in courses.json data file
          }
      }
  })      
  .post(validate({body: courseSchema}), (req, res) => {   
    // add courses: - POST http://localhost:<3000 or env port num>/api/courses/<new course as JSON> 
      if (hyf_courses.addNewCourse(req.body)) {
         res.status(201);
         res.send(`course added: '${req.body.name}'`);
      } else {
        throw new AlreadyExistsError("Course");
         //res.status(400);
         //res.send(`failed to add course: '${req.body.name}'`);
      }
  })
  .put((req, res) => {  
    // edit courses: - PUT http://localhost:<3000 or env port num>/api/courses/<enter edited courses as JSON>  
      if(hyf_courses.editCourses(req.body)) {
         res.status(201);
         res.send(`course updated successfully: '${req.body.name}'`);
      } else {
         res.status(400);
         res.send(`course not found: '${req.body.name}'`);
      }  
  })
  .delete((req, res) => {
    // delete course: - DELETE http://localhost:<3000 or env port num>/api/mentors?name=<deleted courseName>     
    if (hyf_courses.deleteCourses(req.query.name)) {
       res.status(201);
       res.send(`course deleted successfully: '${req.query.name}'`);
    } else {
      res.status(400);
      res.send(`course not found: '${req.query.name}'`);
    }
  });

module.exports = router;