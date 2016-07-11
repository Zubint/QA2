var UserSchema = new mongoose.Schema({
  name:{type:String,
    required:[true, "You must provide a name"],
    minlength:[3, "Name must be at least 3 characters"],
    maxlength:[50, "Name cannot exceed 50 characters"]},
    _questionId:[{type:mongoose.Schema.Types.ObjectId, ref:"Question"}],
  _answerId:[{type:mongoose.Schema.Types.ObjectId, ref:"Answer"}]
}, {timestamps:true});

mongoose.model('User', UserSchema) //register the model.
