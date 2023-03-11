const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const notes = require("../models/notes");
const { body, validationResult } = require("express-validator");

// Route 1 : get all the notes of a user
router.get('/fetchallnotes',fetchuser,
    async (req,res)=>{
    try{
        const allnotes = await notes.find({user: req.user.id});
        res.json(allnotes);
    } catch (error){
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
})

// Route 2 : adding notes for a user
router.post('/addnote',fetchuser,
    [
        body("title", "Enter a valid title").isLength({ min: 3 }),
        body("description", "description should be atleast contains 5 char").isLength({ min: 5 })
    ],
    async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }   
    try{
        const {title,description,tag} = req.body;
        const addednote = new notes({
            title,description,tag,user:req.user.id
        })
        const savednote = await addednote.save();
        res.json(savednote);

    } catch (error){
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
})

// Route 3 : updating notes for a user
router.put('/updatenote/:id',fetchuser,
    async (req,res)=>{
    try{
       const {title,description,tag} = req.body;
        // create a new objet for newnote
        const newnote = {};
        if(title){newnote.title = title};
        if(description){newnote.description = description};
        if(tag){newnote.tag = tag};

        // find the note by id, match with given user id and update it
        const note = await notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not found any notes for given id")};

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed");
        }

        let updatednote = await notes.findByIdAndUpdate(req.params.id,{$set: newnote},{new:true});
        res.json(updatednote);

    } catch (error){
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
})

// Route 4 : deleting notes for a user
router.delete('/deletenote/:id',fetchuser,
    async (req,res)=>{
    let success = false;
    try{
        // find the note by id, match with given user id and delete it
        const note = await notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not found any notes for given id")};

        //checking if logged in user is deleting his own notes
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed");
        }

        let deletednote = await notes.findByIdAndDelete(req.params.id);
        success = true;
        res.json({"Message" : "Note has been deleted successfully" , deletednote , success});

    } catch (error){
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
})

module.exports = router