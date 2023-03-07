const mongoose = require("mongoose");
const supplierSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type_of_supplier:{
        type: String,
        enum: ['importer','manufacturer','distributer']
    },
    name:String,
    address:String,
    phone:String,
    contact_person:String,
    cnic_of_propreitor:String,
    account_number: String,
    license_number: String,
    sales_tax_number:String,
    NTN_number:String,
    supplier_filer_status  : {
        type: String,
        enum: ['filer','non filer']
    },
    sales_Tax  : String,
    general_sales_Tax  : String,
    advance_Tax  : String,
    further_Tax  : String,
    Total_Tax  : String,
   

}
);
module.exports = mongoose.model("supplier", supplierSchema);