import React, { useState } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Zoom from '@mui/material/Zoom';
import axios from "axios";
function CreateArea(props) {

  const [isExpanded, setIsExpanded ] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function expand(){
    setIsExpanded(true);
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  

  return (
    <div>
      <form className="create-note">
        {isExpanded && <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />}
        <textarea
          onClick={expand}
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? "3":"1"}
        />
        <Zoom in={isExpanded}>
          <button onClick={submitNote}><AddCircleIcon /></button>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
