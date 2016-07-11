var Answer = mongoose.model("Answer");
var Question = mongoose.model("Question");
var User = mongoose.model("User");

module.exports = (function(){
  return{

  //
  //   answer:{type:String,
  //     required:[true, "You must provide an answer"],
  //     minlength:[5, "Answer must be at least 5 characters"]},
  //   details:{type:String},
  //   likes:{type:Number},
  //   _userId:{type: mongoose.Schema.Types.ObjectId, ref:"User"},
  //   _questionId:[{type:mongoose.Schema.Types.ObjectId, ref:"Question"}]
  // }, {timestamps:true});
    addlike: function(req, res){

        console.log(req.body, "in add like");

        Answer.findOneAndUpdate({_id:req.body._id}, {$inc: {likes:1}}, function(err, response){
          if(err){
            console.log(err)
          }else {
            res.json({status: true, likes:response});
          }
        })
    },

    create: function(req, res){
        console.log("in answer");

        console.log(req.body)
      // if(req.body.answer == undefined || req.body.answer ={}){
      //   var errorArray = [];
      //   errorArray.push("You must provide ")
      //   res.json({status: false; errors:})
      // }
      var newAnswer = new Answer ({
        answer: req.body.answer,
        details: req.body.details,
        _userId: req.body._userId,
        _questionId: req.body._questionId
      });

      console.log(newAnswer, "new answer object");

        //you need to save the answer_id in questions
        //also
        Question.findOne({_id:req.body._questionId}, function(err, question){
              newAnswer.save(function(err){
                if(err){
                  console.log(err, " new answer save error");
                  var errorsArray = [];
                  for (var i in err.errors){
                    errorsArray.push(err.errors[i].message)
                  }
                  res.json({status:false, errors:errorsArray, qId:req.body._questionId});
                }else{
                question._answerId.push(newAnswer);
                question.save(function(err){
                  if(err){
                    console.log(err)
                  }else{
                    User.findOne({_id:req.body._userId}, function(err, user){
                      if(err){
                        console.log(err)
                      }else {
                        user._answerId.push(newAnswer)
                        user.save(function(err){
                          if(err){
                            console.log(err)
                          }else {

                          }
                        })
                      }
                    })
                    res.json({status: true, newAnswer:newAnswer})
                  }
                })

                if(err){
                  console.log(err);
                }
              }  //end else here
              })
        })


    }

    //add code above
  }
})();
