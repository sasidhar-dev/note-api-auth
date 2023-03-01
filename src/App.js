import './App.css';
import  { API, Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';

import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
} from "@aws-amplify/ui-react";

const myAPI = 'notesapiauth';
const path = '/notes';

function App({ signOut }) {
  const [input, setInput] = useState('');
  const [notes, setNotes] = useState([]);

  function addNote() {
    const newNote = { 'id': Date.now().toString(), 'content': input };
    Auth.currentSession()
      .then(session => {
        const token = session.getIdToken().getJwtToken();
        return API.post(myAPI, path, {
          headers: { Authorization: token },
          body: newNote
        });
      })
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
    async function fetchNotes() {
      try {
        const session = await Auth.currentSession();
        const token = session.getIdToken().getJwtToken();
        const notesResponse = await API.get(myAPI, path, { headers: { Authorization: token } });
        console.log(notesResponse); 
        setNotes(notesResponse); // Update the notes array with the data from the API
      } catch (error) {
        console.log(error);
      }
    }
    fetchNotes();
  }, []);

  return (
    <div className="App">
      <h1>Notes App</h1>
      <div>
        <input placeholder="Note content" type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={() => addNote()}>Add Note +</button>
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
