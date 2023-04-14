import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

const AddNote = ({ showAlert }) => {
  const { addNote } = useContext(NoteContext);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note);
    showAlert("Note Added Successfully", "success");
    setNote({ title: "", description: "", tag: "" });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h1>Add a note</h1>
      <form>
        <div className="form-group mb-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            placeholder="Write a note title"
            name="title"
            value={note.title}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="desc">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Write some description"
            name="description"
            value={note.description}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="desc">Tag(s)</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            placeholder="Add a tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={
            note.title.length < 5 ||
            note.description.length < 5 ||
            note.tag.length === 0
          }
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
