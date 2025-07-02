import { useState } from "react";
import noteContext from "./NoteContext";
const NoteState = (props) => {
  const notesInitial = [{
    _id: "6863bc615bf827e55880dfa8",
    user: "6863ac71f24bac61c3b76a35",
    title: "My playlist",
    description: "Please access the playlist",
    tag: "Youtube",
    date: "2025-07-01T10:45:53.979Z",
    __v: 0,
  }];

  const [notes, setNotes] = useState(notesInitial)
  return (
    <noteContext.Provider value={{notes, setNotes}}>{props.children}</noteContext.Provider>
  );
};

export default NoteState;
