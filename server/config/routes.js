var users = require('./../controllers/users.js');
var questions = require('./../controllers/questions.js');
var answers = require('./../controllers/answers.js');

module.exports = function(app){

  app.post("/users", users.regUser);
  app.get("/session", users.session);
  app.get("/logout", users.logout);


  app.post("/answers/create", answers.create);
  app.post("/answers/addlike", answers.addlike);

  app.post("/questions/create", questions.create);
  app.get("/questions", questions.getQuestions);
  app.get("/questions/:id", questions.getQuestionById);



}
