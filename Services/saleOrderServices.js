const saleOrderModel = require("../models/saleOrderModel");
const supplyOrderModel = require("../models/supplyOrderModel");

const mongoose = require("mongoose");
const customerModel = require("../models/customerModel");

// Get All saleOrder 
exports.getAllsaleOrders = (req, res) => {
    saleOrderModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 }).populate('entry_of_ordered_products').populate('supply_order_id')
}
// Get All supplyOrder 
exports.getAllsaleOrdersSummary = async (req, res) => {
    const data = await saleOrderModel.aggregate().sortByCount("sale_order_state");
    res.send(data)

    // supplyOrderModel.find({}, (error, result) => {
    //     if (error) {
    //         res.send(error)
    //     } else {
    //         res.send(result)
    //     }
    // }).sort({ $natural: -1 }).populate('entry_of_ordered_products')
}
// Get All saleOrder by customer
exports.getAllsaleOrdersByCustomer = (req, res) => {
    const customer_id = req.body.customer_id
    let Arraydata = []
    let SaleOrderCustomer = []
    let orderedProd = []


    saleOrderModel.find({ customer_id: customer_id }, function (err, foundResult) {
        try {
            SaleOrderCustomer = foundResult
            for (let i = 0; i < foundResult.length; i++) {
                for (let j = 0; j < foundResult[i].entry_of_ordered_products.length; j++) {
                    orderedProd.push(foundResult[i].entry_of_ordered_products[j])

                }
            }
            Arraydata = [{
                salesCustomer: SaleOrderCustomer,
                orderedProducts: orderedProd,
                salesOrderCount: SaleOrderCustomer.length,
                orderedProductsCount: orderedProd.length,



            }]
            res.json(Arraydata)
            // res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    }).populate('entry_of_ordered_products')
    // let Arraytemp = []
    // saleOrderModel.find({}, (error, result) => {
    //     if (error) {
    //         res.send(error)
    //     } else {
    //         res.send(result)
    //         console.log(customer_id)

    //         for (let i = 0; i < result.length; i++) {
    //             // console.log(result[i].supply_order_id.customer)
    //             // if(result[i].supply_order_id.customer===customer_id){
    //             //     console.log('matched')
    //             // }else{
    //             //     console.log('not matched')
    //             // }

    //         }
    //         // let itemNames = result.filter(
    //         //     eachObj => eachObj.supply_order_id.customer === customer_id);
    //         //     console.log(itemNames)
    //     }
    // }).sort({ $natural: -1 }).populate('entry_of_ordered_products').populate('supply_order_id')
}
// Get All saleOrder by customer
exports.getAllCustomerSalesByOrderDeliveryStatus = async (req, res) => {

    const data = await saleOrderModel.aggregate().sortByCount("order_delivery_status");
    res.json(data)
}
// Get All saleOrder by customer
exports.getAllCustomerSalesByYearCurrent = async (req, res) => {
    saleOrderModel.find({ customer_id: req.body.customer_id }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            let Processing = 0;
            let Dispached = 0;
            let Delivered = 0
            for (let i = 0; i < result.length; i++) {
              
                if (result.length === 0) {
                    res.json([{
                        customer_name: req.body.customer_name,
                        Processing: 0,
                        Dispached: 0,
                        Delivered: 0,
                    }])

                } else {
                    console.log('NON ZERO')
                    console.log(result)


                   
                    if (result[i].order_delivery_status === "processing") {
                        Processing = parseInt(Processing) + parseInt(1)

                    } else if (result[i].order_delivery_status === "dispatched") {
                        Dispached = parseInt(Dispached) + parseInt(1)

                    } else {
                        Delivered = parseInt(Delivered) + parseInt(1)

                    }
                }

            }
              res.json([{
                customer_name: req.body.customer_name,
                Processing: Processing,
                Dispached: Dispached,
                Delivered: Delivered,
            }])

        }
    })

}
exports.getAllsaleOrdersCustomer = async (req, res) => {
    // const customer_id = req.body.customer_id
    let Arraydata = []
    let SaleOrderCustomer = []
    let orderedProd = []
    const data = await saleOrderModel.aggregate().sortByCount("customer_name")


    saleOrderModel.find({}, function (err, foundResult) {
        try {
            SaleOrderCustomer = foundResult
            for (let i = 0; i < foundResult.length; i++) {
                for (let j = 0; j < foundResult[i].entry_of_ordered_products.length; j++) {
                    orderedProd.push(foundResult[i].entry_of_ordered_products[j])

                }
            }

            Arraydata = [{
                salesCustomer: SaleOrderCustomer,
                orderedProducts: orderedProd,
                salesOrderCount: data,
                orderedProductsCount: orderedProd.length,



            }]
            res.json(Arraydata)

            // res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    }).populate('entry_of_ordered_products')
    // let Arraytemp = []
    // saleOrderModel.find({}, (error, result) => {
    //     if (error) {
    //         res.send(error)
    //     } else {
    //         res.send(result)
    //         console.log(customer_id)

    //         for (let i = 0; i < result.length; i++) {
    //             // console.log(result[i].supply_order_id.customer)
    //             // if(result[i].supply_order_id.customer===customer_id){
    //             //     console.log('matched')
    //             // }else{
    //             //     console.log('not matched')
    //             // }

    //         }
    //         // let itemNames = result.filter(
    //         //     eachObj => eachObj.supply_order_id.customer === customer_id);
    //         //     console.log(itemNames)
    //     }
    // }).sort({ $natural: -1 }).populate('entry_of_ordered_products').populate('supply_order_id')
}
// Get All saleOrder by customer
exports.getAllsaleOrdersByDateRange = async (req, res) => {
    const sdate = req.body.startDate
    const edate = req.body.endDate
    let ArrayTemp = [] //result
    let dataArraySales = [] //Sales Table array
    let arr2 = [];//sales count
    saleOrderModel.find({
        $or: [
            { "date_of_order": { "$gte": sdate, "$lte": edate } }
        ]
    }, (error, foundResult) => {
        if (error) {
            res.json(error)

        } else {
            // res.json(foundResult)
            //Sales orders 
            dataArraySales = foundResult

            let key = "date_of_order"
            foundResult.forEach((x) => {

                if (arr2.some((val) => { return val[key] == x[key] })) {

                    arr2.forEach((k) => {
                        if (k[key] === x[key]) {
                            k["occurrence"]++
                        }
                    })

                } else {
                    let a = {}
                    a[key] = x[key]
                    a["occurrence"] = 1
                    arr2.push(a);
                }
            })
            ArrayTemp = [{
                dataTableSales: dataArraySales,
                countsalesProducts: arr2,
                // dataTablePurchase:dataArrayPurchase,
                // countpurchaseProducts:arr3
            }]
            res.json(ArrayTemp)
            // Purchase Orders 
            // orderedProductsPurchaseOrderModel.find({
            //     $or: [
            //         { "date_of_order": { "$gte": sdate, "$lte": edate } }
            //     ]
            // }, (error, foundResult) => {
            //     if (error) {
            //         res.json(error)

            //     } else {
            //         // res.json(foundResult)
            //          dataArrayPurchase=foundResult

            //         let key = "date_of_order"
            //         foundResult.forEach((x) => {

            //             if (arr3.some((val) => { return val[key] == x[key] })) {

            //                 arr3.forEach((k) => {
            //                     if (k[key] === x[key]) {
            //                         k["occurrence"]++
            //                     }
            //                 })

            //             } else {
            //                 let a = {}
            //                 a[key] = x[key]
            //                 a["occurrence"] = 1
            //                 arr3.push(a);
            //             }
            //         })

            //         ArrayTemp=[{
            //             dataTableSales:dataArraySales,
            //             countsalesProducts:arr2,
            //             dataTablePurchase:dataArrayPurchase,
            //             countpurchaseProducts:arr3
            //         }]
            //         res.json(ArrayTemp)
            // ArrayTemp=[{
            //     dataTableSales:dataArray,
            //     countsalesProducts:arr2
            // }]
            // res.json(ArrayTemp)
            // }
            // }).populate('purchase_order_id')



        }
    })
}

// // Get saleOrder 
exports.getSpecificsaleOrder = (req, res) => {

    const saleOrderId = req.params.saleOrderId;
    saleOrderModel.find({ _id: saleOrderId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    }).populate('entry_of_ordered_products')
}
// // Get saleOrder 
exports.getSpecificsaleOrderBySupplyId = (req, res) => {

    const supplyOrderOrderId = req.params.supply_order_id;
    saleOrderModel.find({ supply_order_id: supplyOrderOrderId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    }).populate('entry_of_ordered_products')
}

// Delete 
exports.deletesaleOrder = (req, res) => {
    const saleOrderId = req.params.saleOrderId;
    saleOrderModel.findByIdAndDelete(saleOrderId, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: true, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Deleted Successfully", statusCode: 200 })

        }
    })
}
// Delete All
exports.deletesaleOrderAll = (req, res) => {
    saleOrderModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error, error: true, message: "Some Error ", statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "All Record Deleted Successful ", statusCode: 200 })

        }
    })
}
// Create 
exports.createsaleOrder = async (req, res) => {
    supplyOrderModel.find({ _id: req.body.supply_order_id }, function (err, foundResult) {
        try {
            const customer_id = foundResult[0].customer
            const customer_name = foundResult[0].customerName

            // res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })
            const saleOrder = new saleOrderModel({
                _id: mongoose.Types.ObjectId(),
                supply_order_id: req.body.supply_order_id,
                customer_id: customer_id,
                customer_name: customer_name,
                sale_ref_no: req.body.sale_ref_no,
                sale_order_over_supply_order: req.body.sale_order_over_supply_order,
                sale_order_state: req.body.sale_order_state,
                date_of_order: new Date().toISOString(),
                order_delivery_status: req.body.order_delivery_status,
                entry_of_ordered_products: [],
                invoice_created_status: req.body.invoice_created_status
            });
            saleOrder.save((error, result) => {
                if (error) {
                    res.status(200).json({ result: error, error: true, message: "Error Creating saleOrder", statusCode: 200 })
                } else {
                    res.status(200).json({ result: result, error: false, message: "Created Successfully", statusCode: 200 })
                    // res.sendStatus(200)
                }
            })
        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })





}
// Update 
exports.updatesaleOrder = async (req, res) => {
    const updateData = {
        sale_order_over_supply_order: req.body.sale_order_over_supply_order,
        sale_order_state: req.body.sale_order_state,
        order_delivery_status: req.body.order_delivery_status,
        invoice_created_status: req.body.invoice_created_status

    }
    const options = {
        new: true
    }
    saleOrderModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

        }
    })
}





