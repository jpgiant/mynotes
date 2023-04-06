const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route 1: Fetching all notes: GET /api/notes/fetchall. Login Required
router.get("/fetchall", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).send("Sorry! Some error has occurred");
  }
});

//Route 2: Add a new note: POST /api/notes/addnote. Login Required
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Title must be atleast 3 characters long").isLength({
      min: 3,
    }),
    body(
      "description",
      "Description must be atleast 5 characters long"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    // res.send(req.body);
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNotes = await notes.save();
      res.json(savedNotes);
    } catch (error) {
      res.status(500).send("Sorry! Some error has occurred");
    }
  }
);

//Route 3: Update Note: PUT /api/notes/updatenote/:id. Login is required
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  //Creating a newNote object
  try {
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

    //Finding the note to be updated
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Prohibited");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    res.status(500).send("Sorry! Some error has occurred");
  }
});

//Route 4: Delete a Note: DELETE /api/notes/deletenote/:id. Login is required
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    //Finding the required note to be deleted
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    //Allow deletion only if that particular user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Prohibited");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Status: "Note has been deleted", note: note });
  } catch (error) {
    res.status(500).send("Sorry! Some error has occurred");
  }
});

module.exports = router;
