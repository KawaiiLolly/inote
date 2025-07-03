import { useState } from "react";
import noteContext from "./NoteContext";
import { set } from "lodash";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  // API TO DO
  const getNotes = async () => {
    // API CALL
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg2M2FjNzFmMjRiYWM2MWMzYjc2YTM1In0sImlhdCI6MTc1MTM2MjY3M30.8Uv-SADoAygD4Ur33tc9INnY5ua-bwDQtiPOSsE_RVk",
        },
      });
      const json = await response.json();
      console.log(json);
      setNotes(json);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Add a note
  // API TO DO
  const addNote = async (title, description, tag) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg2M2FjNzFmMjRiYWM2MWMzYjc2YTM1In0sImlhdCI6MTc1MTM2MjY3M30.8Uv-SADoAygD4Ur33tc9INnY5ua-bwDQtiPOSsE_RVk",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log("Adding a new note");
    setNotes(notes.concat(json));
  };

  // Delete a note
  // API TO DO
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg2M2FjNzFmMjRiYWM2MWMzYjc2YTM1In0sImlhdCI6MTc1MTM2MjY3M30.8Uv-SADoAygD4Ur33tc9INnY5ua-bwDQtiPOSsE_RVk",
      },
    });
    const json = response.json();
    console.log(json);

    console.log("deleting the node with Id - " + id);
    const newNotes = notes.filter((note) => {
      {
        return note._id !== id;
      }
    });
    setNotes(newNotes);
  };

  // Edit a note
  // API TO DO
  const editNote = async (id, title, description, tag) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg2M2FjNzFmMjRiYWM2MWMzYjc2YTM1In0sImlhdCI6MTc1MTM2MjY3M30.8Uv-SADoAygD4Ur33tc9INnY5ua-bwDQtiPOSsE_RVk",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();

    // login to edit in clien
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  return (
    <noteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
