var Question = mongoose.model("Question");
var User = mongoose.model("User");

module.exports = (function(){
  return{

    getQuestions: function (req, res){
        console.log("get questions")
        Question.find({}, function(err, response){
          if(err){
            console.log(err)
          }else {
            res.json({status:true, questions:response})
          }
        })

    },

    getQuestionById: function(req, res){
        console.log(" get q by id")

        Question.findOne({_id:req.params.id})
        .populate("_answerId")
        .exec(function(err, questionAnswer){
          if(err){
            console.log("error with populating question")
          }else {
            User.populate(questionAnswer, {path:"_answerId._userId", model:"User"}, function(err, fullyPopulated){
              if(err){
                console.log(err)
              }else {
                res.json({status: true, questionInfo:fullyPopulated})
              }
            })
          }
        })
          // console.log(response);

        // })
        // res.json({status: true, questionInfo:response});
    },
    create: function(req, res){
        console.log("in create");
        console.log(req.body)

      var newQuestion = new Question ({
        question: req.body.question,
        details: req.body.description,
        _userId: req.body._userId
      });

      console.log(newQuestion, "new question object");

        User.findOne({_id:req.body._userId}, function(err, user){
              newQuestion.save(function(err){
                  var errorsArray = [];
                if(err){
                  for (var i in err.errors){
                    errorsArray.push(err.errors[i].message)
                  }
                  res.json({status: false, errors:errorsArray})
                }else{
                  // res.json({status: true});
                  //now update the user record with the
                  //new question ID
                  user._questionId.push(newQuestion._id);
                  user.save(function(err){
                    if (err){
                      console.log(err)
                    }else{
                      res.json({status:true});
                    }
                  })
                }
              })
        })
    }

  }
})();
