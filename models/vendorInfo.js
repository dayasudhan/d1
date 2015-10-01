var mongoose = require('mongoose');
//Schema
var VendorInfoSchema = new mongoose.Schema({
	hotel:{name:String,email: String,logo:String},
    menu:[{name: String,  price:Number, availability:Number}],
    address:{addressLine1:String,addressLine2:String,street:String, LandMark:String, areaName:String,city:String, zip:String, latitude:Number,longitude:Number },
    phone:Number,
    vegornoveg: String,
    speciality:String,
    deliverRange: Number,
    deliverAreas:[{name:String}]
    });

//Model
var VendorInfoModel = mongoose.model( 'VendorInfoSchema', VendorInfoSchema );

module.exports = VendorInfoModel;