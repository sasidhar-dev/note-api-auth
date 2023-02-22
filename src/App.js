import './App.css';
import  { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';

import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";

// function App({ signOut }) {
//   return (
//     <View className="App">
      
//       <Button onClick={signOut}>Sign Out</Button>
//     </View>
//   );
// }











const myAPI = 'notesapiauth';
const path = '/notes';

function App({ signOut }) {
  const [input, setInput] = useState('');
  const [notes, setNotes] = useState([]);

  function addNote() {
    const newNote = { 'id': Date.now().toString(), 'content': input };
    API.post(myAPI, path, { body: newNote })
      .then(response => {
        console.log(response);
        setNotes([...notes, newNote]); // Add the new note to the current notes array
        setInput(''); // Clear the input field
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    API.get(myAPI, path)
      .then(response => {
        console.log(response);
        setNotes(response); // Update the notes array with the data from the API
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Notes App</h1>
      <div>
        <input placeholder="Note content" type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={() => addNote()}>Add Note</button>
      </div>
      <br />
      <Button onClick={signOut}>Sign Out</Button>
      {
        notes.map((note, index) => {
          return (
            <div key={note.id}>
              <span>{note.content}</span>
              
            </div>
            
          );
        })
      }
    </div>
  );
};
export default withAuthenticator(App);

