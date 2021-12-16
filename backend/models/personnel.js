'use strict';

const mongoose = require('mongoose'), Schema = mongoose.Schema;

const PersonnelSchema = new Schema({
  personAvatar: { type: String, required: true },
  personName: { type: String, required: true },
  personSex: { type: String, required: true },
  personRank: { type: String, required: true },
  personSuperior: { type: String, required: true },
  personPhone: { type: String, required: true },
  personEmail: { type: String, required: true },
  personNoOfDS: { type: String, required: true },
  personStartDate: { type: Date, required: true },
    subordinates: [
      { idSubordinate: { type: String, required: true } }
    ]
});

// Compile model from schema
module.exports = mongoose.model('Personnel', PersonnelSchema);