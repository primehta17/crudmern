const mongoose = require('mongoose');

const itemSchema = mongoose.Schema(
    {
        name: {type:String, require: true},
        description: {type: String},
        user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('Item',itemSchema);