'use strict';

var mongoose = require('mongoose');

var EntitySchema = new mongoose.Schema({
  company_name: String,
  company_phone: String,
  company_email: String,
  location: [{type: mongoose.Schema.Types.ObjectId, ref: 'Location'}],
  owners: [{type: mongoose.Schema.Types.ObjectId, ref: 'Client'}],
  active: {type: Boolean, default: true},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  deleted_at: {type: Date, default: null}
});

mongoose.model('Entity', EntitySchema);
