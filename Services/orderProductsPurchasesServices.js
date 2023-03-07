// const orderProductsPurchasesModel = require("../models/orderProductsPurchasesModel");
const mongoose = require("mongoose");
const orderProductsPurchasesModel = require("../models/orderProductsPurchasesModel");
const purchasesModel = require("../models/purchasesModel");

// Get All orderedProductPurchases 
exports.getAllorderedProductPurchasesSales = (req, res) => {
    orderProductsPurchasesModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}
// // Get orderedProductPurchases 
exports.getSpecificorderedProductPurchasesSale = (req, res) => {

    const orderedProductPurchasesId = req.params.orderedProductPurchasesId;
    orderProductsPurchasesModel.find({ _id: orderedProductPurchasesId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })
}
// // Get orderedProductPurchases 
exports.getOrderedPrductsOfSingleSaleSP = (req, res) => {

    const purchase_order_id = req.body.purchase_order_id;
    orderProductsPurchasesModel.find({ purchase_order_id: purchase_order_id }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })
}

// Delete 
exports.deleteorderedProductPurchasesSale = (req, res) => {
    const orderedProductPurchasesId = req.params.orderedProductPurchasesId;
    orderProductsPurchasesModel.findByIdAndDelete(orderedProductPurchasesId, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: true, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Deleted Successfully", statusCode: 200 })
            const updateData = {
                $pull: {
                    details_of_stock_received: result._id,
                }
            }
            const options = {
                new: true
            }
            purchasesModel.findByIdAndUpdate(result.purchases_id, updateData, options, (error, result) => {
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
exports.deleteOrderProductsAllSale = (req, res) => {
    orderProductsPurchasesModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error, error: true, message: "Some Error ", statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "All Record Deleted Successful ", statusCode: 200 })

        }
    })
}
// Create 
exports.createorderedProductPurchasesSale = async (req, res) => {
                const orderedProductPurchases = new orderProductsPurchasesModel({
                    _id: mongoose.Types.ObjectId(),
                    purchases_id:req.body.purchases_id,
                    supplier_id: req.body.supplier_id,
                    inventory_id: req.body.inventory_id,
                    supplier_name: req.body.supplier_name,
                    purchase_ref_no: req.body.purchase_ref_no,
                    date_of_order: req.body.date_of_order,
                    product_name: req.body.product_name,
                    pack_size: req.body.pack_size,
                    batch_number: req.body.batch_number,
                    expiry_date: req.body.expiry_date,
                    quantity: req.body.quantity,
                    purchases_rate_inRs: req.body.purchases_rate_inRs,
                    amount_in_Rs: req.body.amount_in_Rs,
                    discount_in_Rs: req.body.discount_in_Rs,
                });
                orderedProductPurchases.save((error, result) => {
                    if (error) {
                        res.status(200).json({ result: error, error: true, message: "Error Creating orderedProductPurchases", statusCode: 200 })
                    } else {
                        res.status(200).json({ result: result, error: false, message: "Created Successfully", statusCode: 200 })
                        const updateData = {
                            $push: {
                                details_of_stock_received: result._id,
                            }
                        }
                        const options = {
                            new: true
                        }
                        purchasesModel.findByIdAndUpdate(req.body.purchases_id, updateData, options, (error, result) => {
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
// Update 
exports.updateorderedProductPurchasesSale = async (req, res) => {
    const updateData = {
        // supply_order_id: req.body.supply_order_id,
        // inventory_id:req.body.inventory_id,
        // brand_name: req.body.brand_name,
        // company_id:req.body.company_id,
        // company_name: req.body.company_name,
        packing: req.body.packing,
        m_r_p: req.body.m_r_p,
        quantity: req.body.quantity,
        total_amount: req.body.total_amount,
    }
    const options = {
        new: true
    }
    orderProductsPurchasesModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

        }
    })
}




