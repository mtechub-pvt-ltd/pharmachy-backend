const mongoose = require("mongoose");
const reportSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    report_no:String,
    report_name:String,
    report_description:String,
    reporting_period:{
        type: String,
        enum: [
        'all_customer',
        'all_company',
        'select company',
        'date_range',
        'last_month',
        'date_range_customer',
        'last_month_customer',
        'this_month_customer',
        'this_month',
        'select customer',
        'select product',
        'all'
    ]
    },
    report_type:{
        type: String,
        enum: ['customer','company','product','Sales']
    },
    data_chart:Array

}
);
module.exports = mongoose.model("report", reportSchema);