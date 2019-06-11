/*****            Mentors.js        *****          
 Description: HYF Mentors - CRUD operations  
**/
const fs = require('fs');

class Mentors {
  constructor (fileName) {  
    this.fileName = fileName;   
  }

  // get list of all HYF mentors 
  getAllMentors() {    
     const fileData = fs.readFileSync(this.fileName).toString();
     const allMentors = JSON.parse(fileData);
     return(allMentors);
  }

  // get mentor by name. Returns course if found, undefined otherwise 
  getMentorByName(mentorName) {
     const allMentors = this.getAllMentors();
     return allMentors.find(q => q.name.toLowerCase() === mentorName.toLowerCase());
  }
   
  // add a new mentor to HYF Mentors List 
  addNewMentor(newMentor) {
      // return true if mentor added, otherwise return false
      if(this.getMentorByName(newMentor.name)) {
         return false; 
      }
      const allMentors = this.getAllMentors();
      allMentors.push(newMentor);
      // save new mentor 
      const newFileData = JSON.stringify(allMentors, null, 4);
      fs.writeFileSync(this.fileName, newFileData);
      return true;        
  }

  // update existing mentors 
  editMentors(mentor) {
    if(this.getMentorByName(mentor.name)) {

      const allMentors = this.getAllMentors();        
      const mentorIdx = allMentors.findIndex(q => (q.name.toLowerCase() === mentor.name.toLowerCase()));  
      
      if (mentorIdx >= 0) {
          // update mentor & save
          allMentors[mentorIdx] = mentor;          
          
          const newFileData = JSON.stringify(allMentors, null, 4);
          fs.writeFileSync(this.fileName, newFileData);
          return true;     
      }else { 
          return false;   
      } 
    }
  } 

  // delete existing mentor
  deleteMentors(name) {    
    const allMentors = this.getAllMentors(); 
    const foundIndex = allMentors.findIndex(q => (q.name.toLowerCase() === name.toLowerCase()));
     
    if (foundIndex >= 0)  {
        // delete mentor from list if exists & save 
        const mentorsList = allMentors.filter(mentor => mentor.name.toLowerCase() !== name.toLowerCase());

        const newFileData = JSON.stringify(mentorsList, null, 4);
        fs.writeFileSync(this.fileName, newFileData);
        return true;
    } else {
      return false;    
    }
  }
   
 /* getList() {
    return this.getAllMentors();    
  }*/
  getMentorsByCourseTitle(courseName) {
    const allMentors = this.getAllMentors();  //getList()
    const mentorsName = [];
   
    allMentors.forEach(mentor => { 
      if(mentor.courses.indexOf(courseName) > -1)
        mentorsName.push(mentor.name);         
     });    
     return(mentorsName);
  }

}; 
// Export modules to make it public to other files  
module.exports = Mentors;
