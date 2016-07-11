boardApp.factory("AnswerFactory", function($http){
  var factory={};

  factory.createAnswer = function(answer, callback){
    console.log(answer, " question")
    $http.post("/answers/create", answer).success(function(response){
        console.log(response);
        callback(response);
    })
  },

  factory.addlike = function(answer, callback){
    $http.post("/answers/addlike", answer).success(function(response){
      console.log(response);
      callback(response);
    })
  }

  // factory.getQuestions = function(callback){
  //   $http.get("/questions").success(function(response){
  //     callback(response)
  //   })
  // },
  //
  // factory.getQuestionById = function(id, callback){
  //   $http.get("/questions/"+id).success(function(response){
  //     callback(response);
  //   })
  // }




  //add more methods above

return factory;
})
