const supplyOrderModel = require("../models/supplyOrderModel");
const mongoose = require("mongoose");
const moment = require("moment");

const customerModel = require("../models/customerModel");
const orderedProductModel = require("../models/orderedProductModel");

// Get All supplyOrder 
exports.getAllsupplyOrders = (req, res) => {
    supplyOrderModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 }).populate('entry_of_ordered_products')
}
// Get All supplyOrder 
exports.getAllsupplyOrdersSummary = async (req, res) => {
    const data = await supplyOrderModel.aggregate().sortByCount("supply_order_status");
    res.send(data)

    // supplyOrderModel.find({}, (error, result) => {
    //     if (error) {
    //         res.send(error)
    //     } else {
    //         res.send(result)
    //     }
    // }).sort({ $natural: -1 }).populate('entry_of_ordered_products')
}
exports.getAllsupplyOrdersCompletedCount = async (req, res) => {
    const data =await supplyOrderModel.aggregate(
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
    const data1 = await supplyOrderModel.aggregate().sortByCount("supply_order_status");
    supplyOrderModel.find({}, (error, result) => {
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
exports.getAllsupplyOrdersDue = async (req, res) => {
   
    supplyOrderModel.find({ $or:[ {supply_order_status:'partially delivered'}, {supply_order_status:'overdue'}]}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
           
            res.send({data:result})


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
// monthly data 
exports.getallmonthlysupplyorders = async (req, res) => {
    const data = await supplyOrderModel.aggregate(
        [
            {
                $group: {
                    _id: { $substrCP: ["$date_of_order", 6, 10] },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id": 1 }
            },

        ]
    )
    res.json(data)
}
// weekly
exports.getweeklysupplyOrderSales = async (req, res) => {
    var curr = new Date; // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first - 6; // last day is the first day + 6
    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));
    // const DateDatastart = moment(firstday).format("DD/MM/YYYY")
    // const DateDataend = moment(lastday).format("DD/MM/YYYY")
    // console.log(`${DateDatastart} and ${DateDataend}`)

    console.log(`${firstday} and ${lastday}`)
    // const data = supplyOrderModel.find({
    //     date_of_order:
    //         { $gte: DateDatastart, $lt: DateDataend }
    // })
    // res.json(data)
}
// daily data
exports.getdailysupplyOrderSales = async (req, res) => {

    const data = await supplyOrderModel.aggregate(
        [

            { $unwind: "$date_of_order" },
            { $sortByCount: "$date_of_order" },
        ]
    )
    // console.log(data)
    for (let article of data) {
        let dateArr = article._id.split('/');
        // Year, month, and day from the array. We subtract 1 from month, since months start counting from 0 in Javascript dates.
        let year = parseFloat(dateArr[2]);
        let month = parseFloat(dateArr[1]) - 1;
        let day = parseFloat(dateArr[0])
        // Pass in the different components as year, month, day to get the valid date
        let articleDate = new Date(year, month, day);
        // Update the object
        article._id = articleDate
    }

    data.sort((a, b) => a._id - b._id);
    res.json(data)
}
// // Get supplyOrder 
exports.getSpecificsupplyOrder = (req, res) => {

    const supplyOrderId = req.params.supplyOrderId;
    supplyOrderModel.find({ _id: supplyOrderId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    }).populate('entry_of_ordered_products').populate("customer")

}
// // Get supplyOrder 
exports.getSpecificCustomerSO = (req, res) => {

    const customer_id = req.body.customer_id;
    supplyOrderModel.find({ customer: customer_id }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })
}

// Delete 
exports.deletesupplyOrder = (req, res) => {
    const supplyOrderId = req.params.supplyOrderId;
    supplyOrderModel.findByIdAndDelete(supplyOrderId, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: true, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Deleted Successfully", statusCode: 200 })

        }
    })
}
// Delete All
exports.deletesupplyOrderAll = (req, res) => {
    supplyOrderModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error, error: true, message: "Some Error ", statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "All Record Deleted Successful ", statusCode: 200 })

        }
    })
}
// Create 
exports.createsupplyOrder = async (req, res) => {
    customerModel.find({ _id: req.body.customer }, (error, result) => {
        if (error) {
            res.status(200).json({ result: error, error: true, message: "Error in supplyOrder name ", statusCode: 200 })

        } else {
            // console.log(result[0])
            const customerName = result[0].name
            //         if (result === undefined || result.length == 0) {
            // let refNo = Math.floor((Math.random() * 10000) + 1);

            const supplyOrder = new supplyOrderModel({
                _id: mongoose.Types.ObjectId(),
                stage_of_supply_order: "advance supply order",
                customer: req.body.customer,
                customerName: customerName,
                ref_no: req.body.ref_no,
                type_of_order: req.body.type_of_order,
                supply_order_status: req.body.supply_order_status,
                date_of_order: req.body.date_of_order,
                order_valid_untill: req.body.order_valid_untill,
                special_instructions: req.body.special_instructions,
                entry_of_ordered_products: [],

            });
            supplyOrder.save((error, result) => {
                if (error) {
                    res.status(200).json({ result: error, error: true, message: "Error Creating supplyOrder", statusCode: 200 })
                } else {
                    res.status(200).json({ result: result, error: false, message: "Created Successfully", statusCode: 200 })
                    // res.sendStatus(200)
                }
            })


        }
    })

}
// Update 
exports.updatesupplyOrder = async (req, res) => {
    const updateData = {
        stage_of_supply_order: req.body.stage_of_supply_order,
        customer: req.body.customer,
        ref_no: req.body.ref_no,
        type_of_order: req.body.type_of_order,
        supply_order_status: req.body.supply_order_status,
        date_of_order: req.body.date_of_order,
        order_valid_untill: req.body.order_valid_untill,
        special_instructions: req.body.special_instructions,
        entry_of_ordered_products: req.body.entry_of_ordered_products,
    }
    const options = {
        new: true
    }
    supplyOrderModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

        }
    })
}




