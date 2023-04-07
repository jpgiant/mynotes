import React, {useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import NoteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
  const { note, updateNoteModal } = props;
  const { deleteNote, editNote } = useContext(NoteContext);

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title"> {note.title}</h5>
          <p className="card-text">{note.description}</p>
          <a href="#" id="crudIconStyle" onClick={()=>{deleteNote(note._id)}}>
            <FontAwesomeIcon
              icon={faTrash}
              style={{ fontSize: "20px" }}
              // className="mx-2"
            />
          </a>
          <a href="#" id="crudIconStyle" onClick={()=>{editNote(note._id,note)}}>
            <FontAwesomeIcon
              icon={faPenToSquare}
              style={{ fontSize: "20px" }}
              className="mx-2"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
