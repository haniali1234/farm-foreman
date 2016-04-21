'use strict';

var mongoose = require('mongoose');

var CompanySchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    active: {type: Boolean, default: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    deleted_at: {type: Date, default: null}
});

mongoose.model('Company', CompanySchema);
