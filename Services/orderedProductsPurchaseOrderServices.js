const orderedProductsPurchaseOrderModel = require("../models/orderedProductsPurchaseOrderModel");
const mongoose = require("mongoose");
const purchaseOrderModel = require("../models/purchaseOrderModel");

// Get All orderedProduct 
exports.getAllorderedProductsP = (req, res) => {
    orderedProductsPurchaseOrderModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
        .populate('purchase_order_id')
        .populate('inventory_id')
        .populate('company_id')

}
// // Get orderedProduct 
exports.getSpecificorderedProductP = (req, res) => {

    const orderedProductId = req.params.orderedProductId;
    orderedProductsPurchaseOrderModel.find({ _id: orderedProductId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })
        .populate('purchase_order_id')
        .populate('inventory_id')
        .populate('company_id')
}
// // Get orderedProduct 
exports.getOrderedPrductsOfSingleSPP = (req, res) => {

    const purchase_order_id = req.body.purchase_order_id;
    orderedProductsPurchaseOrderModel.find({ purchase_order_id: purchase_order_id }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })
}

// Delete 
exports.deleteorderedProductP = (req, res) => {
    const orderedProductId = req.params.orderedProductId;
    orderedProductsPurchaseOrderModel.findByIdAndDelete(orderedProductId, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: true, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Deleted Successfully", statusCode: 200 })
            const updateData = {
                $pop: {
                    entry_of_purchase_products: orderedProductId,
                }
            }
            const options = {
                new: true
            }
            purchaseOrderModel.findByIdAndUpdate(result.purchase_order_id, updateData, options, (error, result) => {
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
exports.deleteOrderProductsAllP = (req, res) => {
    orderedProductsPurchaseOrderModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error, error: true, message: "Some Error ", statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "All Record Deleted Successful ", statusCode: 200 })

        }
    })
}
// Create 
exports.createorderedProductP = async (req, res) => {
    purchaseOrderModel.find({ _id: req.body.purchase_order_id }, (error, result) => {
        if (error) {
            res.status(200).json({ result: error, error: true, message: "Error in orderedProduct name ", statusCode: 200 })
        } else {
            if (result === undefined || result.length == 0) {
                res.status(200).json({ result: result, error: true, message: "id invalid", statusCode: 200 })

            } else {
                const dateOrder = result[0].date_of_order

                const orderedProduct = new orderedProductsPurchaseOrderModel({
                    _id: mongoose.Types.ObjectId(),
                    purchase_order_id: req.body.purchase_order_id,
                    inventory_id: req.body.inventory_id,
                    item_code: req.body.item_code,
                    registration_no: req.body.registration_no,
                    date_of_order: dateOrder,
                    generic_name: req.body.generic_name,
                    batch_no: req.body.batch_no,
                    brand_name: req.body.brand_name,
                    expiry_date: req.body.expiry_date,
                    company_id: req.body.company_id,
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
                            $push: {
                                entry_of_purchase_products: result._id,
                            }
                        }
                        const options = {
                            new: true
                        }
                        purchaseOrderModel.findByIdAndUpdate(req.body.purchase_order_id, updateData, options, (error, result) => {
                            if (error) {
                                res.json(error.message)
                            } else {
                                // res.send({ data: result, message: "Updated careGiver Successfully" })
                            }
                        })


                        // res.sendStatus(200)
                    }
                })
            }
        }
    })

}
// Update 
exports.updateorderedProductP = async (req, res) => {
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
    orderedProductsPurchaseOrderModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

        }
    })
}




