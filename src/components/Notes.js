import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = ({ showAlert }) => {
  const ref = useRef(null);
  const refClose = useRef(null);
  const { notes, getAllNotes, editNote } = useContext(NoteContext);
  const navigate = useNavigate();
  const [note, setNote] = useState({
    id: "",
    editTitle: "",
    editDescription: "",
    editTag: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllNotes();
    } else {
      navigate("/signin");
    }
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    // setNote({ title: "", description: "", tag: "" });
    editNote(note);
    refClose.current.click();
    showAlert("Note Edited Successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const showEditModal = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      editTitle: currentNote.title,
      editDescription: currentNote.description,
      editTag: currentNote.tag,
    });
  };

  return (
    <>
      <AddNote showAlert={showAlert} />
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
        style={{ visibility: "hidden" }}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group mb-3">
                  <label htmlFor="title">Edit Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editTitle"
                    // aria-describedby="emailHelp"
                    placeholder="Write a note title"
                    name="editTitle"
                    value={note.editTitle}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="desc">Edit Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editDescription"
                    placeholder="Enter some description"
                    name="editDescription"
                    value={note.editDescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="desc">Edit Tag(s)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editTag"
                    placeholder="Enter a tag"
                    name="editTag"
                    value={note.editTag}
                    onChange={onChange}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={
                  note.editTitle.length < 5 ||
                  note.editDescription.length < 5 ||
                  note.editTag.length === 0
                }
                onClick={handleClick}
              >
                Edit Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container row my-3">
        <h1>Your Notes</h1>
        <div className="container">
          {notes.length === 0 && "No Notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem
              note={note}
              key={note._id}
              showAlert={showAlert}
              showEditModal={showEditModal}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
