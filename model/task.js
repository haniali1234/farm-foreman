'use strict';

var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
    task_name: String,
    task_desc: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    deleted_at: {type: Date, default: null}
});

mongoose.model('Task', TaskSchema);
