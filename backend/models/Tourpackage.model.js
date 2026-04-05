const mongoose = require('mongoose');

const TourPackage = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    destination:{
        type:String,
        required:true,
    },
    duration:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    availability:{
        type:Boolean,
        default:true
    },
    maxGroupSize:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    itinerary:[
        {
            day:{
                type:Number,
                required:true,
            },
            title:{
                type:String,
                required:true,
            },
            activities:[String],
        }
    ],
    images:[
        String
    ],
    tags:[
        String
    ],
},{timestamps:true});

module.exports = mongoose.model('TourPackage',TourPackage);