const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret")

let tripSchema = new mongoose.Schema({
    name: String,
    info: String,
    img_url: String,
    location: String,
    price: Number,
    area: String,
    difficulty: String,
    typeOfTrip: String,
    style: String,
    praticipants:String,
    // role of the user if regular user or admin
    active: {
        type: Boolean, default: true,
    },
})

exports.TripModel = mongoose.model("trips", tripSchema);


exports.validTrip = (_reqBody) => {
    let joiSchema = Joi.object({
        name: Joi.string().min(2).max(99).required(),
        info: Joi.string().min(2).max(99).required(),
        img_url: Joi.string().min(2).max(99).allow(null, ""),
    })

    return joiSchema.validate(_reqBody);
}