const {Customer, validate} = require('../models/customer'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const joi =require('joi')
const bcrypt = require('bcryptjs');



router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

router.post('/', async (req, res) => {
  const {error }= validate(req.body); 
  
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({ 
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    mobileNumber: req.body.mobileNumber,
    skillSet: req.body.skillSet,
    is_active: req.body.is_active
  });
  try{
    const salt = await bcrypt.genSalt(10);
    customer.password = await bcrypt.hash(customer.password, salt);
    customer = await customer.save();
    res.send(customer);
    }
  catch(err) {
    res.status(400).send(err);
    }
  
});


router.get('/:id', async (req, res) => {
  try{
  const customer = await Customer.findById(req.params.id);
  //if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  res.send(customer);
  }
  catch (err)
  {
    res.status(404).send('The customer with the given ID was not found.');
    //console.log("get by id callSS")

    
  }
})


router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id,
      {   
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        mobileNumber: req.body.mobileNumber,
        skillSet: req.body.skillSet,
        is_active: req.body.is_active
      
      }, { new: true });

    //if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    
    const salt = await bcrypt.genSalt(10);
    customer.password = await bcrypt.hash(customer.password, salt);
    res.send(customer);
    
    }
  
  catch(err) {
    res.status(400).send('The customer with the given ID was not found.');
  
  
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    res.send(customer);
  }
  catch (err)
    {
      res.status(404).send('The customer with the given ID was not found.');
    }

  // if (!customer) return res.status(404).send('The customer with the given ID was not found.');

});




module.exports = router; 