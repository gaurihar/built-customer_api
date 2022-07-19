const joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  mobileNumber: String,
  skillSet: [String],
  birthYear: Number,
  is_active: Boolean,
  
  }
));

function validateCustomer(customer) {
  const schema = joi.object( {
    userName: joi.string().alphanum().min(3).max(25).trim(true).required(),
    email: joi.string().email().trim(true).required(),
    password: joi.string().min(8).trim(true).required(),
    mobileNumber: joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
    birthYear: joi.number().integer().min(1920).max(2000),
    skillSet: joi.array().items(joi.string().alphanum().trim(true)).default([]),
    is_active: joi.boolean().default(true),
  });

  return schema.validate(customer);
}

exports.Customer = Customer; 
exports.validate = validateCustomer;



// {
//   "userName": "gauri12",
//   "email":"gaur@gmail.com",
//   "password":"12345678",
//   "mobileNumber":"6789012345",
//   "birthYear": 1995,
//   "skillSet":["python","elasticsearch"],
//   "is_active": true


// }