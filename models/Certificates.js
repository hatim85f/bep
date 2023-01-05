const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const CertificatesSchema = Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = Certificates = model("certificates", CertificatesSchema);
