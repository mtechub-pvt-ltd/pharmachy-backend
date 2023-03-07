const orderedProductModel = require("../models/orderedProductSalesModel");
const mongoose = require("mongoose");
const saleOrderModel = require("../models/saleOrderModel");
const orderedProductsPurchaseOrderModel = require("../models/orderedProductsPurchaseOrderModel");
const inventoryModel = require("../models/inventoryModel");

// Get All orderedProduct 
exports.getAllorderedProductSales = (req, res) => {
    orderedProductModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}
// // Get orderedProduct 
exports.getSpecificorderedProductSale = (req, res) => {

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
exports.getOrderedPrductsOfSingleSaleSP = (req, res) => {

    const supply_order_id = req.body.supply_order_id;
    orderedProductModel.find({ supply_order_id: supply_order_id }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })
}
// Get orderedProduct of all inventory 
exports.getOrderedPrductsReport = async (req, res) => {
    // const data =await orderedProductModel.aggregate().sortByCount("brand_name")
    // res.json(data)
    orderedProductModel.find({}, async (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result)
            let SalesTable = result
            const data = await orderedProductModel.aggregate().sortByCount("brand_name")
            // res.send(data)
            orderedProductsPurchaseOrderModel.find({}, async (error, result) => {
                if (error) {
                    res.send(error)
                } else {
                    // res.send(result)
                    let purchaseTable = result
                    const data1 = await orderedProductsPurchaseOrderModel.aggregate().sortByCount("brand_name")
                    // res.send(data)
                    let ArrayTemp = {
                        salesOrdersTable: SalesTable,
                        data_sales_count: data,
                        purchaseOrdersTable: purchaseTable,
                        data_purchase_count: data1
                    }
                    res.json(ArrayTemp)
                }
            }).populate('purchase_order_id')
            // let ArrayTemp = {
            //     salesOrdersTable: SalesTable,
            //     data_sales_count:data
            // }
            // res.json(ArrayTemp)
        }
    }).populate('sale_order_id')

    // const supply_order_id = req.body.supply_order_id;
    // orderedProductModel.find({ supply_order_id: supply_order_id }, function (err, foundResult) {
    //     try {
    //         res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

    //     } catch (err) {
    //         res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
    //     }
    // })
}
// Get orderedProduct of all companies 
exports.getOrderedCompanysReport = async (req, res) => {
    // const data =await orderedProductModel.aggregate().sortByCount("brand_name")
    // res.json(data)
    orderedProductModel.find({}, async (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result)
            let SalesTable = result
            const data = await orderedProductModel.aggregate().sortByCount("company_name")
            // res.send(data)
            orderedProductsPurchaseOrderModel.find({}, async (error, result) => {
                if (error) {
                    res.send(error)
                } else {
                    // res.send(result)
                    let purchaseTable = result
                    const data1 = await orderedProductsPurchaseOrderModel.aggregate().sortByCount("company_name")
                    // res.send(data)
                    let ArrayTemp = {
                        salesOrdersTable: SalesTable,
                        data_sales_count: data,
                        purchaseOrdersTable: purchaseTable,
                        data_purchase_count: data1
                    }
                    res.json(ArrayTemp)
                }
            }).populate('purchase_order_id')
            // let ArrayTemp = {
            //     salesOrdersTable: SalesTable,
            //     data_sales_count:data
            // }
            // res.json(ArrayTemp)
        }
    }).populate('sale_order_id')

    // const supply_order_id = req.body.supply_order_id;
    // orderedProductModel.find({ supply_order_id: supply_order_id }, function (err, foundResult) {
    //     try {
    //         res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

    //     } catch (err) {
    //         res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
    //     }
    // })
}
exports.getOrderedPrductsReportPurchases = async (req, res) => {
    // const data =await orderedProductModel.aggregate().sortByCount("brand_name")
    // res.json(data)
    orderedProductsPurchaseOrderModel.find({}, async (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result)
            let purchaseTable = result
            const data = await orderedProductsPurchaseOrderModel.aggregate().sortByCount("brand_name")
            // res.send(data)
            let ArrayTemp = {
                purchaseOrdersTable: purchaseTable,
                data_sales_count: data
            }
            res.json(ArrayTemp)
        }
    }).populate('purchase_order_id')

    // const supply_order_id = req.body.supply_order_id;
    // orderedProductModel.find({ supply_order_id: supply_order_id }, function (err, foundResult) {
    //     try {
    //         res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

    //     } catch (err) {
    //         res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
    //     }
    // })
}
// Get orderedProduct of all inventory by Current month

exports.getOrderedPrductsReportByDateRange = async (req, res) => {
    const sdate = req.body.startDate
    const edate = req.body.endDate
    let ArrayTemp=[] //result
    let dataArraySales=[] //Sales Table array
    let dataArrayPurchase=[] //Purchase Table array
    let arr2 = [];//sales count
    let arr3 = []; //Purchse count


    orderedProductModel.find({
        $or: [
            { "date_of_order": { "$gte": sdate, "$lte": edate } }
        ]
    }, (error, foundResult) => {
        if (error) {
            res.json(error)

        } else {
            // res.json(foundResult)
            //Sales orders 
            dataArraySales=foundResult
            
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
            // Purchase Orders 
            orderedProductsPurchaseOrderModel.find({
                $or: [
                    { "date_of_order": { "$gte": sdate, "$lte": edate } }
                ]
            }, (error, foundResult) => {
                if (error) {
                    res.json(error)
        
                } else {
                    // res.json(foundResult)
                     dataArrayPurchase=foundResult
                    
                    let key = "date_of_order"
                    foundResult.forEach((x) => {
        
                        if (arr3.some((val) => { return val[key] == x[key] })) {
        
                            arr3.forEach((k) => {
                                if (k[key] === x[key]) {
                                    k["occurrence"]++
                                }
                            })
        
                        } else {
                            let a = {}
                            a[key] = x[key]
                            a["occurrence"] = 1
                            arr3.push(a);
                        }
                    })

                    ArrayTemp=[{
                        dataTableSales:dataArraySales,
                        countsalesProducts:arr2,
                        dataTablePurchase:dataArrayPurchase,
                        countpurchaseProducts:arr3
                    }]
                    res.json(ArrayTemp)
                    // ArrayTemp=[{
                    //     dataTableSales:dataArray,
                    //     countsalesProducts:arr2
                    // }]
                    // res.json(ArrayTemp)
                }
            }).populate('purchase_order_id')


           
        }
    }).populate('sale_order_id')

}
// Get orderedProduct by inventory id 
exports.getOrderedPrductsReportSingle = async (req, res) => {
    let ArrayData = []
    orderedProductModel.find({ inventory_id: req.body.inventory_id }, function (err, foundResult) {
        try {
            const SalesOrderCount = foundResult.length
            const ArraySales = foundResult
            orderedProductsPurchaseOrderModel.find({ inventory_id: req.body.inventory_id }, function (err, foundResult) {
                try {
                    let result = {
                        purchseOrderCount: foundResult.length,
                        salesOrderCount: SalesOrderCount,
                        ArraySales: ArraySales,
                        ArrayPurchases: foundResult
                    }
                    ArrayData.push(result)
                    res.json(ArrayData)

                } catch (err) {
                    res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
                }
            }).populate("purchase_order_id")


        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    }).populate("sale_order_id")

}
// Get orderedProduct by company id 
exports.getOrderedPrductsReportSingleCom = async (req, res) => {
    let ArrayData = []
    orderedProductModel.find({ company_id: req.body.company_id }, function (err, foundResult) {
        try {
            const SalesOrderCount = foundResult.length
            const ArraySales = foundResult
            orderedProductsPurchaseOrderModel.find({ company_id: req.body.company_id }, function (err, foundResult) {
                try {
                    let result = {
                        purchseOrderCount: foundResult.length,
                        salesOrderCount: SalesOrderCount,
                        ArraySales: ArraySales,
                        ArrayPurchases: foundResult
                    }
                    ArrayData.push(result)
                    res.json(ArrayData)

                } catch (err) {
                    res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
                }
            }).populate("purchase_order_id")


        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    }).populate("sale_order_id")

}

// Delete 
exports.deleteorderedProductSale = (req, res) => {
    const orderedProductId = req.params.orderedProductId;
    orderedProductModel.findByIdAndDelete(orderedProductId, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: true, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Deleted Successfully", statusCode: 200 })
            const updateData = {
                $pop: {
                    entry_of_ordered_products: orderedProductId,
                }
            }
            const options = {
                new: true
            }
            saleOrderModel.findByIdAndUpdate(result.sale_order_id, updateData, options, (error, result) => {
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
    orderedProductModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error, error: true, message: "Some Error ", statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "All Record Deleted Successful ", statusCode: 200 })

        }
    })
}
// Create 
exports.createorderedProductSale = async (req, res) => {
    saleOrderModel.find({ _id: req.body.sale_order_id }, (error, result) => {
        if (error) {
            res.status(200).json({ result: error, error: true, message: "Error in orderedProduct name ", statusCode: 200 })

        } else {
            if (result === undefined || result.length == 0) {
                res.status(200).json({ result: result, error: true, message: "sale order Id Invalid", statusCode: 200 })
            } else {
                // console.log(result)
                const dateOrder = result[0].date_of_order
                // console.log(dateOrder)
                const orderedProduct = new orderedProductModel({
                    _id: mongoose.Types.ObjectId(),
                    supply_order_id: req.body.supply_order_id,
                    sale_order_id: req.body.sale_order_id,
                    date_of_order: dateOrder,
                    inventory_id: req.body.inventory_id,
                    brand_name: req.body.brand_name,
                    company_id: req.body.company_id,
                    company_name: req.body.company_name,
                    packing: req.body.packing,
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
                                entry_of_ordered_products: result._id,
                            }
                        }
                        const options = {
                            new: true
                        }
                        saleOrderModel.findByIdAndUpdate(req.body.sale_order_id, updateData, options, (error, result) => {
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
exports.updateorderedProductSale = async (req, res) => {
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
    orderedProductModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

        }
    })
}




