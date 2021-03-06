var express = require('express');
var router = express.Router();

var user = require('../controllers/user');
var animal = require('../controllers/animal');
var comments = require('../controllers/comments');

var multer = require('multer');
var bodyParser = require('body-parser');

// storage defines the storage options to be used for file upload with multer
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'PetAdoption/public/uploads/');
  },
  filename: function (req, file, cb) {
    var original = file.originalname;
    var file_extension = original.split(".");
    // Make the file name the date + the file extension
    filename =  Date.now() + '.' + file_extension[file_extension.length-1];
    cb(null, filename);
  }
});
var upload = multer({ storage: storage });


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pet Adoption' });
});
/* GET home page using localhost:3000/index. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Pet Adoption' });
});
/* Fetch the welcome page */
router.get('/welcome', function(req, res, next) {
  res.render('welcome', { title: 'Pet Adoption' });
});

/* Fetch the login page */
router.post('/login', function(req, res, next) {
  user.getUser(req,res)
});

/* Submit the registration page */
router.post('/register', function(req, res) {
  user.registerUser(req,res);
});

/* Submit the adoption page */
router.post('/adopt', function(req, res) {
  animal.applyForAdoption(req,res);
});

/* Add animal */
router.post('/addAnimal', upload.single('animalImage'), function(req, res) {
  console.log(req);
  animal.insertAnimal(req, res)
});

/* Fetch the search page */
router.post('/search_animal', function(req, res, next) {
  //res.render('search', { title: 'Search Page'});
  console.log("test get", req.body)
  animal.fetchAllAnimals(req, res);
});

/* Fetch the animal page */
router.post('/animal', function(req, res, next) {
  //res.render('animal', { title: 'Animal Page'});
  console.log("Route animal.js", req.body)
  animal.displayAnimal(req,res)
});

/* Fetch the animal page */
router.post('/animal', function(req, res, next) {
  //res.render('animal', { title: 'Animal Page'});
  console.log("Route animal.js", req.body)
  animal.displayAnimal(req,res)
});

/* Insert the comment */
router.post('/insertComment', function(req, res, next) {
  console.log("Route to insertComment")
  comments.insertComment(req,res)
});

/* Submit the adoption page */
router.post('/adopt', function(req, res) {
  animal.applyForAdoption(req,res);
});

/* Add animal */
router.post('/addAnimal', upload.single('animalImage'), function(req, res) {
  console.log(req);
  animal.insertAnimal(req, res)
});

/* logout the session*/
router.post('/logout', function(req, res, next) {
  console.log("Logout session")
  req.session.user = false
  //res.redirect('/welcome')
});


module.exports = router;
