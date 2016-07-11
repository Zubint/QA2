var QuestionSchema = new mongoose.Schema({
  question:{type:String,
    required:[true, "You must provide an answer"],
    minlength:[10, "Question must be at least 10 characters"]},
    details:{type:String},
    _userId:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
  _answerId:[{type:mongoose.Schema.Types.ObjectId, ref:"Answer"}]
}, {timestamps:true});

mongoose.model('Question', QuestionSchema) //register the model.
