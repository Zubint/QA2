var AnswerSchema = new mongoose.Schema({
  answer:{type:String,
    required:[true, "You must provide an answer"],
    minlength:[5, "Answer must be at least 5 characters"]},
  details:{type:String},
  likes:{type:Number, default:0},
  _userId:{type: mongoose.Schema.Types.ObjectId, ref:"User"},
  _questionId:[{type:mongoose.Schema.Types.ObjectId, ref:"Question"}]
}, {timestamps:true});

mongoose.model('Answer', AnswerSchema) //register the model.
