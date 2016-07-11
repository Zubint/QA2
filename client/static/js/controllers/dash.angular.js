boardApp.controller("DashController", function($scope, UserFactory, QuestionFactory, $location){
  $scope.sessionUser ={};
  $scope.errorsArray = [];

    QuestionFactory.getQuestions(function(response){
      if(response.status){
        $scope.questions = response.questions
      }else {
        console.log(response)
      }
    })



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
