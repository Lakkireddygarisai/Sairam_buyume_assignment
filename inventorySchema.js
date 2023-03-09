const mongoose = require('mongoose');

const inventorySchema = new mongose.Schema({
    productId: {
        type : Number,
        reqired: true
    },
    quantity: {
        type : Number,
        required : true,
        min : 0
    }
}); 

module.exports = mongoose.model('Inventory', inventorySchema);