import React, { useState,useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";
//post request statement:-
// axios.post("http://localhost:3000/NewNoteAdded",{notes}).then(function(res){console.log(res)}).catch(function(err){console.log(err)});

//How to use the function 'useEffect(0'


function App() {
  
  useEffect(()=>{

   
      axios
      .get("http://localhost:3000/notes")
      .then(function(response){
      //if we get our response which will be a list of documents of notes
      setNotes(response.data);
      setGetNotes(false);
      console.log("this is axios.get() request !!!");
    })
    .catch(function(err){
      console.log(err);
    });
  

  },[]);



  const [getNotes,setGetNotes] = useState(true);
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
    axios
    .post("http://localhost:3000/NewNoteAdded",
    {title:newNote.title,
    content:newNote.content})
    .then(function(res){console.log(res.data)})
    .catch(function(err){console.log(err)});

    }


  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
    axios
    .delete("http://localhost:3000/deleteNote/"+notes[id].title)
    .then(function(res){  
      console.log("successfully deleted the required note element !!")
    })
    .catch(function(err){
      console.log(err);
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
