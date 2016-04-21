'use strict';

var mongoose = require('mongoose');

var ClientSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    phone: String,
    email: String,
    entity: {type: mongoose.Schema.Types.ObjectId, ref:'Entity'},
    location: {type: mongoose.Schema.Types.ObjectId, ref:'Entity'},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    deleted_at: {type: Date, default: null}});


mongoose.model('Client', ClientSchema);
