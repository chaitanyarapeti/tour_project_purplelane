const mongoose = require('mongoose');

const paymentSchema = mongoose.connect({
    bookingId:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    method:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:['success','pending','failed']
    },
    payemntDate:{
        type:Date,
        required:true,
    },
    gatewayResponse:{
        gateway:{
            type:String,
            required:true,
        },
        referenceId:{
            type:String,
            reqired:true,
        },
        currency:{
            type:String,
            default:"INR",
        }
    }
},{timestamps:true})

module.exports = mongoose.model('Payemnt',paymentSchema);