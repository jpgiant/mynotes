import NoteContext from "./NoteContext.js";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //Get all notes
  const getAllNotes = async () => {
    //API Call
    const response = await fetch(`${host}/api/notes/fetchall`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxZDRhNzA2MTAzNTg2NzM3ZjgzZDJjIn0sImlhdCI6MTY3OTY0MTIwMH0.7HoICpF6Ecl7pYiN59auA0o79sG9vgn5K3HCkpAhqw4",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  //Add a note
  const addNote = async (n) => {
    const { title, description, tag } = n;
    //API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxZDRhNzA2MTAzNTg2NzM3ZjgzZDJjIn0sImlhdCI6MTY3OTY0MTIwMH0.7HoICpF6Ecl7pYiN59auA0o79sG9vgn5K3HCkpAhqw4",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    const note = {
      _id: "6426cd51388f64ew3002a07553",
      user: "641d4a706103we586737f83d2c",
      title: `${title}`,
      description: `${description}`,
      tag: `${tag}`,
      date: "2023-03-31T12:08:49.221Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //Edit a note
  const editNote = async (n) => {
    const { id, editTitle, editDescription, editTag } = n;
    // console.log(id, editTitle, editDescription, editTag)
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxZDRhNzA2MTAzNTg2NzM3ZjgzZDJjIn0sImlhdCI6MTY3OTY0MTIwMH0.7HoICpF6Ecl7pYiN59auA0o79sG9vgn5K3HCkpAhqw4",
      },
      body: JSON.stringify({
        title: editTitle,
        description: editDescription,
        tag: editTag,
      }),
    });
    const json = await response.json();
    console.log(json);
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < newNotes.length; i++) {
      // console.log(notes[i])
      const elem = newNotes[i];
      if (elem._id === id) {
        newNotes[i].title = editTitle;
        newNotes[i].description = editDescription;
        newNotes[i].tag = editTag;
        break;
      }
    }
    setNotes(newNotes);
  };

  //Delete a note
  const deleteNote = async (id) => {
    //API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxZDRhNzA2MTAzNTg2NzM3ZjgzZDJjIn0sImlhdCI6MTY3OTY0MTIwMH0.7HoICpF6Ecl7pYiN59auA0o79sG9vgn5K3HCkpAhqw4",
      },
    });
    const json = response.json();
    console.log(json);
    const newNotes = setNotes(
      notes.filter((note) => {
        return note._id !== id;
      })
    );
    console.log(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, editNote, deleteNote, getAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
