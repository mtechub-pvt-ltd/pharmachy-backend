const purchaseOrderModel = require("../models/purchaseOrderModel");
const mongoose = require("mongoose");
const supplierModel = require("../models/supplierModel");


// Get All purchaseOrder 
exports.getAllpurchaseOrders = (req, res) => {
    purchaseOrderModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 }).populate('supplier_id').populate('entry_of_purchase_products')
}
// // Get purchaseOrder 
exports.getSpecificpurchaseOrder = (req, res) => {

    const purchaseOrderId = req.params.purchaseOrderId;
    purchaseOrderModel.find({ _id: purchaseOrderId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    }).populate('supplier_id').populate('entry_of_purchase_products')

}
// // Get purchaseOrder 
exports.getSpecificsupplierPO = (req, res) => {

    const supplier_id = req.body.supplier_id;
    purchaseOrderModel.find({ supplier_id: supplier_id }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })
}
exports.getAllPurchaseOrdersDue = async (req, res) => {
   
    purchaseOrderModel.find({ $or:[ {supply_status:'pending'}, {supply_status:'partially received'}]}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
           
            res.send(result)


        }
    })

}
// Delete 
exports.deletepurchaseOrder = (req, res) => {
    const purchaseOrderId = req.params.purchaseOrderId;
    purchaseOrderModel.findByIdAndDelete(purchaseOrderId, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: true, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Deleted Successfully", statusCode: 200 })

        }
    })
}
// Delete All
exports.deletepurchaseOrderAll = (req, res) => {
    purchaseOrderModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error, error: true, message: "Some Error ", statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "All Record Deleted Successful ", statusCode: 200 })

        }
    })
}
// Create 
exports.createpurchaseOrder = async (req, res) => {
    supplierModel.find({ _id: req.body.supplier_id }, (error, result) => {
        if (error) {
            res.status(200).json({ result: error, error: true, message: "Error in supplyOrder name ", statusCode: 200 })

        } else {
            // console.log(result)
            const supplierName = result[0].name
            const type_of_supplier=result[0].type_of_supplier
            const purchaseOrder = new purchaseOrderModel({
                _id: mongoose.Types.ObjectId(),
                stage_of_purchase_order: req.body.stage_of_purchase_order,
                supplier_id: req.body.supplier_id,
                supplier_name: supplierName,
                ref_no: req.body.ref_no,
                type_of_supplier: type_of_supplier,
                type_of_order: req.body.type_of_order,
                // date_of_order: req.body.date_of_order,
                date_of_order:new Date().toISOString(),
                order_valid_untill: req.body.order_valid_untill,
                supply_status: req.body.supply_status,
                entry_of_purchase_products:[]

            });
            purchaseOrder.save((error, result) => {
                if (error) {
                    res.status(200).json({ result: error, error: true, message: "Error Creating purchaseOrder", statusCode: 200 })
                } else {
                    res.status(200).json({ result: result, error: false, message: "Created Successfully", statusCode: 200 })
                    // res.sendStatus(200)
                }
            })
        }
    })

}
// Purchase Order All 
exports.getAllpurchaseOrdersCompletedCount = async (req, res) => {
    const data =await purchaseOrderModel.aggregate(
        [
            {
                $group: {
                    _id: { $substrCP: ["$date_of_order", 3, 10] },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id": 1 }
            },

        ]
    )
    const data1 = await purchaseOrderModel.aggregate().sortByCount("supply_status");
    purchaseOrderModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            const countAll=result.length
           
            res.send({data:data,total:countAll,completedOrderd:data1})


        }
    })

    // supplyOrderModel.find({}, (error, result) => {
    //     if (error) {
    //         res.send(error)
    //     } else {
    //         res.send(result)
    //     }
    // }).sort({ $natural: -1 }).populate('entry_of_ordered_products')
}
// Update 
exports.updatepurchaseOrder = async (req, res) => {
    const updateData = {
        supplier_id: req.body.supplier_id,
        supplier_name: req.body.supplier_name,
        type_of_supplier: req.body.type_of_supplier,

        stage_of_purchase_order: req.body.stage_of_purchase_order,
        type_of_order: req.body.type_of_order,
        order_valid_untill: req.body.order_valid_untill,
        supply_status: req.body.supply_status
    }
    const options = {
        new: true
    }
    purchaseOrderModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

        }
    })
}




