boardApp.controller("QuestionsController", function($scope, UserFactory, QuestionFactory, $location){
  $scope.sessionUser ={};
  $scope.errorsArray = [];

    $scope.createQuestion = function(){
      if($scope.newQuestion !=undefined){
          $scope.newQuestion._userId = $scope.sessionUser.user_id
      }

      console.log($scope.newQuestion)
      QuestionFactory.create($scope.newQuestion, function(response){
        if(response.status){
          console.log(" response, true")
          //head back to the dashboard
          $location.url("/dashboard");
        }else {
          $scope.errorsArray = response.errors;
          console.log(" response, false")
          // $location.url("#/new_question")

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

  $scope.logout=function(){
    UserFactory.logout(function(response){
      if(!response.status){
        $location.url("/users")
      }
    })
  }

  })
