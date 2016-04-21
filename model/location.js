'use strict';

var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
    /****  Models to be set as drop boxes ******/
    address: String,
    city: String,
    zip: String,
    state: String,
    field_id: String,
    entity: {type: mongoose.Schema.Types.ObjectId, ref: 'Entity'},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    deleted_at: {type: Date, default: null}
});


mongoose.model('Location', LocationSchema);
