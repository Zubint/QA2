boardApp.controller("NewAnswersController", function($scope, AnswerFactory, UserFactory, QuestionFactory, $routeParams, $location){
  $scope.sessionUser ={};
  $scope.errorsArray = [];


    QuestionFactory.getQuestionById($routeParams.id, function(response){
      if(response.status){
        $scope.questions = response.questionInfo
      }else {
        console.log(response)
        $scope.errorsArray = response.errors;
      }
    })

    $scope.createAnswer = function(){
      var answer = '';

      if ($scope.newAnswer !=undefined){
        $scope.newAnswer._questionId = $scope.questions._id;
        $scope.newAnswer._userId = $scope.sessionUser.user_id;
        var answer = $scope.newAnswer.answer;
      }else{
        $scope.errorsArray = [];
        $scope.errorsArray.push("You must include an answer");
        // $location.url("/questions/"+$scope.questions._+"/new_answer");
      }

        // if(answer.trim().length<5){
        //    $scope.errorsArray = [];
        //   $scope.errorsArray.push("Your answer must be at least 5 characters long");
        //   return false
        // }

        AnswerFactory.createAnswer($scope.newAnswer, function(response){
            console.log(response.status, " status in newanswers")
          if (!response.status){
            $scope.errorsArray = response.errors;
            // console.log($scope.errorsArray);
            console.log("status is false in add")
          }else{
            // console.log("true - I expect to redirect");
            $location.url("/dashboard");
          }
        })

    }

    $scope.logout = function(){
      UserFactory.logout(function(response){
        if(response.status){
          console.log("questions controller - logout ", response.sessionUser)
          $scope.sessionUser = response.sessionUser
          $location.url("/")
        }else{
          $scope.errorsArray.push(response.errors);
        }
      })
    }


    UserFactory.getUser(function(user_info){
        $scope.sessionUser=user_info;
        console.log($scope.sessionUser.loggedin);
    if(!$scope.sessionUser.loggedIn){
      $location.url("/users");
    }else {
      // $location.url("/questions/"+$routeParams.id+"/new_answer");
    }
  })
})
