const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
  fname: {
    type: String,
    default: "",
  },
  lname: {
    type: String,
    default: "",
  },

  activecheck: {
    type: Boolean,
    default: "false",
  },

  // numberOfOpenings: {
  //   type: String,
  //   default: "",
  // },
  roles: {
    type: [String],
    enum: ['Admin', 'Supervisor', 'Author'],
    required: true
  },
  
});
const CompanyModel = mongoose.model("companies", CompanySchema);
module.exports = CompanyModel;
