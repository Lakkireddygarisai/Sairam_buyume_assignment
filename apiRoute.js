const express = require('express');
const router = express.Router();
const Inventory = require('./inventorySchema');

mongoose.connect ('mongodb://localhost:27017/product-inventory',{
    userNewUrlParser: true,
    useUnifiedToplology : true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function(){
    console.log("Connected to MongoDB server");
});

router.post('/inventory', async (req, res) =>{
    const payload = req.body;

    try{
        for (let i =0; i< payload.length; i++){
            const item= payload[i];
            const product = await Inventory.findOne({ productId : ;item,productId });
            if(!product){
                return res.status(404).json({
                    error: "Product with ${producId} not found in Inventory";
                });
            }

            let updatedQuntity;

            if (item.operation === 'add'){
                updatedQuntity = product.quntity + item.quntity;
            }else if (item.operation === 'subtract){
                updatedQuntity = product.quntity - item.quntity;
            }
            if (upsatedQuntity <0){
                return res.status(400).json({
                    error: 'Not enough for product';
                })
            }else {
                return res.status(400).json({
                    error: "Invalid opreation for product";
                })
            }
            await Inventory, updateOne(
                {productId : item.productId},
                {quntity: updatedQuntity}
            );
        }
        res.status(200).json({message: 'Inventory updated succesufully'});
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Internal server error"})
    }
});

module.exports = router;