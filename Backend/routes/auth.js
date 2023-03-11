const express = require("express");
const user = require("../models/schema");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

// Route 1 : end point of creating a user in database
// checking the valid entries
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "password should be strong").isLength({ min: 5 }),
  ],
    async (req, res) => {
        let success = false; 
        const errors = validationResult(req);
        // checking validation result 
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
    try{
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt); 
        let currUser = await user
        .create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        const JWT_SECRET = "beinghuman";
        const data = {
            user: {
            id: currUser.id
            }
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success,authtoken});
        } catch (error){
        console.error(error.message);
        res.status(500).send("Internal Server error");
        }
    }
);


//Route 2: endpoint for authentication 
router.post(
    "/login",
    [
      body("email", "Enter a valid email").isEmail(),
      body("password", "password can not be blank").exists()
    ],
      async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        let success = false;
        const{email,password} = req.body;
        try{
           let chkuser = await user.findOne({email});
           if(!chkuser){
            return res.status(400).json({error: "please enter correct credentials"});
           }
           const pswComp = await bcrypt.compare(password,chkuser.password);
           if(!pswComp){
            return res.status(400).json({error: "please enter correct credentials"});
           }
           const JWT_SECRET = "beinghuman";
            const data = {
            user: {
            id: chkuser.id
            }
            };
            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({success , authtoken});

        }catch(error){
            console.error(error.message);
            res.status(500).send("Internal Server error");
        }

    }
);

// Route 3 : endpoint for getting user details
router.post(
  "/getuser",fetchuser,
    async (req, res) => {
      try{
        let userid = req.user.id;
        let lguser = await user.findById(userid).select();
        res.json(lguser);
      }catch(error){
          console.error(error.message);
          res.status(500).send("Internal Server error");
      }

  }
);

module.exports = router;
