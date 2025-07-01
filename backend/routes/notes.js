const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Fetch all notes - GET - Login Required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ROUTE 2: Add a new note - POST - Login Required
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter valid title!").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters!").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// ROUTE 3: Update a new note - PUT - Login Required
router.put(
  "/updatenote/:id",
  fetchUser,

  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }

      // find the note to be updated and update it
      let note = await Notes.findById(req.params.id);
      if (!note) {
        res.status(404).send("Not Found! ");
      }

      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed! ");
      }

      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json({ note });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// ROUTE 4: Delete an existing not - DELETE - Login Required
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    // find the note to be delete update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(404).send("Not Found! ");
    }

    // allow deletion only if user owns it
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed! ");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json("Note has been successfully deleted!");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
