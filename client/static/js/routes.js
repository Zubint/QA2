boardApp.config(function($routeProvider){
  $routeProvider
  .when("/users", {
    templateUrl: "../partials/users.html"
  })
  .when("/dashboard", {
    templateUrl: "../partials/dashboard.html"
  })
  .when("/new_question", {
    templateUrl: "../partials/new_question.html"
  })
  .when("/questions/:id", {
    templateUrl: "../partials/showQuestion.html"
  })
  .when("/questions/:id/new_answer", {
    templateUrl: "../partials/new_answer.html"
  })
  .otherwise({
    redirectTo: "/users"
  })
})
