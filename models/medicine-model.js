const mongoose = require("mongoose");

const dosageSchema = new mongoose.Schema({
  age_range: { type: String, default: "" },
  dose: { type: String, default: "" }
}, { _id: false });

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand_name: { type: String, default: "" },
  category: { type: String, required: true },
  form: { type: String, default: "" },
  indication: { type: String, required: true },
  dosage: [dosageSchema],
  frequency: { type: String, default: "" },
  precautions: [String],
  notes: { type: String, default: "" }
}, { timestamps: true });

const Medicine = mongoose.model("Medicine", medicineSchema, "medicines");

exports.retrieveAll = function () {
  return Medicine.find();
};

exports.search = function (query) {
  return Medicine.find(query);
};

exports.findById = function (id) {
  return Medicine.findOne({ _id: id });
};

exports.create = function (data) {
  return Medicine.create(data);
};

exports.update = function (id, data) {
  return Medicine.updateOne({ _id: id }, data);
};

exports.remove = function (id) {
  return Medicine.deleteOne({ _id: id });
};

exports.count = function () {
  return Medicine.countDocuments();
};
