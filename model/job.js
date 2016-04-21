'use strict';

var mongoose = require('mongoose');

var JobSchema = new mongoose.Schema({
    /****  Models to be set as drop boxes ******/
    location: String,
    entity: {type: mongoose.Schema.Types.ObjectId, ref: 'Entity'},
    tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}],
    date: String,
    notes: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    approved: {type: Boolean, default: false},
    foreman: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    deleted_at: {type: Date, default: null}
});

mongoose.model('Job', JobSchema);
