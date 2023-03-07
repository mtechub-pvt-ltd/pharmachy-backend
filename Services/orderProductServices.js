const orderedProductModel = require("../models/orderedProductModel");
const mongoose = require("mongoose");
const supplyOrderModel = require("../models/supplyOrderModel");
const inventoryModel = require("../models/inventoryModel");


// Get All orderedProduct 
exports.getAllorderedProducts = (req, res) => {
    orderedProductModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}
// Graph 
exports.getAllorderedProductsGraph = async(req, res) => {
    const data = await orderedProductModel.aggregate().sortByCount("brand_name");
    // res.send(data)
    let Array=[]
    inventoryModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result)
            const result1 = result.map((a) => {
                return {item_name:a.item_name, pack_size:a.pack_size}
              });
              for(let i=0;i<result1.length;i++){
                 for(let j=0;j<data.length;j++){
                    if(data[j]._id===result1[i].item_name){
                        Array.push({item_name:result1[i].item_name,pack_size:result1[i].pack_size,count:data[j].count})
                    }else{
                        Array.push({item_name:result1[i].item_name,pack_size:result1[i].pack_size,count:0})

                    }
                 }
              }
              res.send({Array:Array,total_products:Array.length})

        }
    })
  
}
// // Get orderedProduct 
exports.getSpecificorderedProduct = (req, res) => {

    const orderedProductId = req.params.orderedProductId;
    orderedProductModel.find({ _id: orderedProductId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })
}
// // Get orderedProduct 
exports.getOrderedPrductsOfSingleSP = (req, res) => {

    const supply_order_id = req.body.supply_order_id;
    orderedProductModel.find({ supply_order_id: supply_order_id }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })
}

// Delete 
exports.deleteorderedProduct = (req, res) => {
    const orderedProductId = req.params.orderedProductId;
    orderedProductModel.findByIdAndDelete(orderedProductId, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: true, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Deleted Successfully", statusCode: 200 })
            const updateData = {
                $pop:{
                    entry_of_ordered_products: orderedProductId,
                }
            }
            const options = {
                new: true
            }
            supplyOrderModel.findByIdAndUpdate(result.supply_order_id, updateData, options, (error, result) => {
                if (error) {
                    // res.json(error.message)
                } else {
                    // res.send({ data: result, message: "Updated babyInfo Successfully" })
                }
            })

        }
    })
}
// Delete All
exports.deleteOrderProductsAll = (req, res) => {
    orderedProductModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error,error:true, message: "Some Error " ,statusCode:200})

        } else {
            res.status(200).json({ result: result,error:false, message: "All Record Deleted Successful " ,statusCode:200})

        }
    })
}
// Create 
exports.createorderedProduct = async (req, res) => {
    // orderedProductModel.find({ name: req.body.name }, (error, result) => {
    //     if (error) {
    //         res.status(200).json({ result: error,error:true, message: "Error in orderedProduct name " ,statusCode:200})

    //     } else {
    //         if (result === undefined || result.length == 0) {
    const orderedProduct = new orderedProductModel({
        _id: mongoose.Types.ObjectId(),
        supply_order_id: req.body.supply_order_id,
        inventory_id:req.body.inventory_id,
        brand_name: req.body.brand_name,
        company_id:req.body.company_id,
        company_name: req.body.company_name,
        m_r_p: req.body.m_r_p,
        quantity: req.body.quantity,
        total_amount: req.body.total_amount,

    });
    orderedProduct.save((error, result) => {
        if (error) {
            res.status(200).json({ result: error, error: true, message: "Error Creating orderedProduct", statusCode: 200 })
        } else {
            res.status(200).json({ result: result, error: false, message: "Created Successfully", statusCode: 200 })
            const updateData = {
                $push:{
                    entry_of_ordered_products: result._id,
                }
            }
            const options = {
                new: true
            }
            supplyOrderModel.findByIdAndUpdate(req.body.supply_order_id, updateData, options, (error, result) => {
                if (error) {
                    res.json(error.message)
                } else {
                    // res.send({ data: result, message: "Updated careGiver Successfully" })
                }
            })


            // res.sendStatus(200)
        }
    })

    //         } else {
    //             res.status(200).json({ result: result,error:true, message: "orderedProduct Already Exists" ,statusCode:200})

    //         }
    //     }
    // })

}
// Update 
exports.updateorderedProduct = async (req, res) => {
    const updateData = {
        // supply_order_id: req.body.supply_order_id,
        // inventory_id:req.body.inventory_id,
        // brand_name: req.body.brand_name,
        // company_id:req.body.company_id,
        // company_name: req.body.company_name,
        m_r_p: req.body.m_r_p,
        quantity: req.body.quantity,
        total_amount: req.body.total_amount,
    }
    const options = {
        new: true
    }
    orderedProductModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

        }
    })
}




