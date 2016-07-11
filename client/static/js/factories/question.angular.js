boardApp.factory("QuestionFactory", function($http){
  var factory={};

  factory.create = function(question, callback){
    console.log(question, " question")
    $http.post("/questions/create", question).success(function(response){
        console.log(response);
        callback(response);
    })
  },

  factory.getQuestions = function(callback){
    $http.get("/questions").success(function(response){
      callback(response)
    })
  },

  factory.getQuestionById = function(id, callback){
    $http.get("/questions/"+id).success(function(response){
      callback(response);
    })
  }




  //add more methods above

return factory;
})
