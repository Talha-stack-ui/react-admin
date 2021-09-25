const mongoose = require('mongoose');

//Products Schema
const productSchema = new mongoose.Schema({
name : {
    type : String,
    required : true
},
image : {
    type : String,
    required : true
},
description : {
    type : String,
    required : true
},
title : {
    type : String,
    required : true
}
});

module.exports = mongoose.model('Product', productSchema);

    