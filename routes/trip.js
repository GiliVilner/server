const express= require("express");
const { auth, authAdmin } = require("../middlewares/auth");
const { validTrip, TripModel } = require("../models/tripModel");
const router = express.Router();

router.get("/" ,authAdmin, async(req,res)=> {
  let perPage = req.query.perPage || 99;
  let page = req.query.page || 1;

  try{
    let data = await TripModel.find({})
    .limit(perPage)
    .skip((page - 1) * perPage)
    // .sort({_id:-1}) like -> order by _id DESC
    .sort({_id:-1})
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json({msg:"there error try again later",err})
  }
})
router.get("/results/:area/:difficulty/:typeOfTrip/:style/:praticipants" ,authAdmin, async(req,res)=> {
    let perPage = req.query.perPage || 10;
    let page = req.query.page || 1;
      try{
        let resA = req.params.area;
        let resD = req.params.difficulty;
        let resT = req.params.typeOfTrip;
        let resS = req.params.style;
        let resP = req.params.praticipants;
        let resRegA = new RegExp(resA,"i")
        let resRegD = new RegExp(resD,"i")
        let resRegT = new RegExp(resT,"i")
        let resRegS = new RegExp(resS,"i")
        let resRegP = new RegExp(resP,"i")
        let data = await TripModel.find({$and:[{area:resRegA}
            ,{difficulty:resRegD},{typeOfTrip:resRegT},
            {style:resRegS},{praticipants:resRegP}]})
        .limit(perPage)
        .skip((page - 1)*perPage)
        .sort({_id:-1})
        res.json(data);
      }
      catch(err){
        console.log(err);
        res.status(500).json({msg:"there error try again later",err})
      }
})

router.post("/", authAdmin, async(req,res) => {
    let validBody = validTrip(req.body);
    if(validBody.error){
      res.status(400).json(validBody.error.details)
    }
    try{
      let trip = new TripModel(req.body);
      await trip.save();
      res.json(trip);
    }
    catch(err){
      console.log(err)
      res.status(500).json({msg:"err",err})
    }
  })
  
  router.put("/:idEdit", authAdmin, async(req,res) => {
    let validBody = validTrip(req.body);
    if(validBody.error){
      res.status(400).json(validBody.error.details)
    }
    try{
      let idEdit = req.params.idEdit
      let data = await TripModel.updateOne({_id:idEdit},req.body);
      res.json(data);
    }
    catch(err){
      console.log(err)
      res.status(500).json({msg:"err",err})
    }
  })
  
  router.delete("/:idDel", authAdmin, async(req,res) => {
    try{
      let idDel = req.params.idDel
      let data = await TripModel.deleteOne({_id:idDel});
      res.json(data);
    }
    catch(err){
      console.log(err)
      res.status(500).json({msg:"err",err})
    }
  })
  
  module.exports = router;