const AlreadyExistsError = require("./errors/AlreadyExistsError");
const errorHandler = require("./errorHandler");

/********  app.js  ********  
   Description: HackYourFuture Courses CRUD App 
   Allows users to find HYF courses and mentors. 
**/ 
const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const cors = require("cors");
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false }));
// parse application/json
app.use(bodyParser.json());

const routers = [
  require("./routes/mentors"),
  require("./routes/courses")
]

for (const router of routers) {
  app.use('/api', router);
}

// initialise Port
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Welcome to HYF Course App - using expressJS!'));
app.get('/api', (req, res) => res.send('HYF Course App - API'));

app.use(errorHandler);

// start the server
app.listen(port, () => console.log(`HYF course app listening on port - http://localhost:${port}`));
