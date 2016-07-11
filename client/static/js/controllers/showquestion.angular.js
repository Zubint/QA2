boardApp.controller("ShowQuestionController", function($scope, AnswerFactory, UserFactory, QuestionFactory, $routeParams, $location){
  $scope.sessionUser ={};
  $scope.errorsArray = [];



    QuestionFactory.getQuestionById($routeParams.id, function(response){
      if(response.status){
        console.log(response.questionInfo);
        $scope.questions = response.questionInfo
      }else {
        console.log(response, " get q by id in controller")
      }
    })

    $scope.addLike= function(answer){
      console.log(answer, " in add like controller");
      AnswerFactory.addlike(answer, function(response){
        if(response.status){
          QuestionFactory.getQuestionById($routeParams.id, function(response){
            if(response.status){
              console.log(response.questionInfo);
              $scope.questions = response.questionInfo
            }else {
              console.log(response)
            }
          })
        }else {
          console.log(response);
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
        // console.log($scope.sessionUser.loggedin);
    if(!$scope.sessionUser.loggedIn){
      $location.url("/users");
    }else {
      // $location.url("/board");
    }
  })
})
