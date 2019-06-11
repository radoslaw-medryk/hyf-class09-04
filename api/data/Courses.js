/*****            Courses.js        *****          
 Description: HYF Courses - CRUD operations  
**/
const fs = require('fs');  
const Mentors = require("./Mentors");
const mentors = new Mentors("./data/mentors.json");

class Courses {
  constructor (fileName) {  
     this.fileName = fileName;
  }
   // get list of all HYF courses
  getAllCourses() {  
     const fileData = fs.readFileSync(this.fileName).toString();
     const allCourses = JSON.parse(fileData);
     return(allCourses);      
  }

  // get all courses including mentors
  getList(){     
     const allCourses = this.getAllCourses();   
     allCourses.forEach(course => {
       course['mentors'] = mentors.getMentorsByCourseTitle(course.name);
     });
     return allCourses;    
  }

  // get course by name. Returns course if found, undefined otherwise
  getCourseByName(courseName) {   
     const allCourses = this.getList();   //this.getAllCourses();
     return allCourses.find(q => q.name.toLowerCase() === courseName.toLowerCase());    
  }

  // add a new course to HYF courses list
  addNewCourse(newCourse) {
    // return true if course added, otherwise return false
     if (this.getCourseByName(newCourse.name)){
        return false;      
     }
     const allCourses = this.getAllCourses();
     allCourses.push(newCourse);

     const newFileData = JSON.stringify(allCourses, null, 4);
     fs.writeFileSync(this.fileName, newFileData);
      return true;    
  }  
  
  // update existing courses
  editCourses(course) {
   if(this.getCourseByName(course.name)) {

     const allCourses = this.getAllCourses();        
     const courseIdx = allCourses.findIndex(q => (q.name.toLowerCase() === course.name.toLowerCase()));  
     
     if (courseIdx >= 0) {
         // update course & save
         allCourses[courseIdx] = course;

         const newFileData = JSON.stringify(allCourses, null, 4);
         fs.writeFileSync(this.fileName, newFileData);
         return true;    
      }else { 
         return false;    
      } 
    }
  }  
   
  // delete existing course
  deleteCourses(name) {  
   const allCourses = this.getAllCourses(); 
   const foundIndex = allCourses.findIndex(q => (q.name.toLowerCase() === name.toLowerCase()));
     
   if (foundIndex >= 0)  {
       // delete course from list if exists & save 
       const coursesList = allCourses.filter(course => course.name.toLowerCase() !== name.toLowerCase());

       const newFileData = JSON.stringify(coursesList, null, 4);
       fs.writeFileSync(this.fileName, newFileData);
       return true;
   } else {
     return false;    
   }
 }

};
// Export modules to make it public to other files  
module.exports = Courses; 

