// 9
const mongoose = require("mongoose");
const Joi = require("joi");

const blogchema = new mongoose.Schema({
  title: String,
  info: String,
  user_id: String,
  date_created: {
    type: Date, default: Date.now()
  },
  date_update: {
    type: Date, default: Date.now()
  },
  answers: [{
    comment: String, user_id: String, date_created: {
      type: Date, default: Date.now()
    },
    img_url: String,
    url: String
  }],
})



exports.BlogModel = mongoose.model("blogs", blogchema);

const answerSchema = Joi.object({
  comment: Joi.string().min(2).max(500).required(),
}); 

exports.validateBlog = (_reqBody) => {
  let joiSchema = Joi.object({
    title: Joi.string().min(2).max(99).required(),
    // url_name: Joi.string().min(2).max(99).required(),
    info: Joi.string().min(2).max(500).required(),
    // img_url: Joi.string().min(2).max(200).required()
  })
  return joiSchema.validate(_reqBody);
}
// exports.validateAnswer = (_reqBody) => {
//   let joiSchema = Joi.object({
//      answers: Joi.array().items(answerSchema)
//   })
//   return joiSchema.validate(_reqBody);
// }



exports.validateAnswer = (_reqBody) => {
  let joiSchema = Joi.object({
    // title: Joi.string().min(2).max(99).required(),
    // info: Joi.string().min(2).max(500).required(),
  comment: Joi.string().min(2).max(500).required()

    // answers: Joi.array().items(answerSchema)
  });
  return joiSchema.validate(_reqBody);
}
