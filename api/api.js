const express = require('express');
const router = express.Router();

//Required api's 
// const ImageUpload = require('./Routes/ImageUpload')
const Admin = require('./Routes/Admin')
const User = require('./Routes/userRoutes')
const Company = require('./Routes/Company')
const Inventory = require('./Routes/Inventory')
const Customer = require('./Routes/Customer')
const SupplyOrder = require('./Routes/supplyOrder')
const OrderProduct = require('./Routes/orderProduct')
const SaleOrder = require('./Routes/saleOrder')
const Staff = require('./Routes/Staff')
const Supplier = require('./Routes/Suppliers')
const GenerateReportSupply = require('./Routes/generateReportSupply')
const OrderProductSales = require('./Routes/orderProductSales')
const Invoice = require('./Routes/Invoice')
const InvoiceSupplier = require('./Routes/InvoiceSupplier')

const Purchase_Order = require('./Routes/Purchaseorder')
const Purchase_Ordered_Products = require('./Routes/orderedProductsPurchaseOrder')
const Purchases = require('./Routes/Purchases')
const PurchasesProducts = require('./Routes/orderProductPurchases')

const Reports = require('./Routes/Report')
const Expenses = require('./Routes/Expenses')
const Payments = require('./Routes/Payments')
const Account = require('./Routes/Account')
const AccountBalance = require('./Routes/AccountBalance')

const Ledger = require('./Routes/Ledger')
const LedgerSupplier = require('./Routes/LedgerSupplier')












/*********Main Api**********/

router.use('/admin',Admin);
router.use('/user',User);
router.use('/company',Company);
router.use('/inventory',Inventory);
router.use('/customer',Customer);
router.use('/supplyOrder',SupplyOrder);
router.use('/orderProduct',OrderProduct);
router.use('/saleOrder',SaleOrder);
router.use('/staff',Staff);
router.use('/supplier',Supplier);
router.use('/GenerateReportSupply',GenerateReportSupply)
router.use('/orderProductSales',OrderProductSales)
router.use('/invoice',Invoice)
router.use('/invoiceSupplier',InvoiceSupplier)

router.use('/purchase_order',Purchase_Order)
router.use('/purchase_ordered_products',Purchase_Ordered_Products)
router.use('/purchases',Purchases)
router.use('/report',Reports)
router.use('/purchase_products',PurchasesProducts)
router.use('/expenses',Expenses)
router.use('/payments',Payments)
router.use('/account',Account)
router.use('/ledger',Ledger)
router.use('/ledgerSupplier',LedgerSupplier)
router.use('/AccountBalance',AccountBalance)































module.exports = router;