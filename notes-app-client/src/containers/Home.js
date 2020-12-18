import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";


export default function Home() {
  const [notes, setNotes] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      {/* If user is not login yet, do nothing */}
      if (!isAuthenticated) {
        return;
      }
  
      {/* If user has already login, load all the notes with this userid */}
      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        onError(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [isAuthenticated]);
  
  {/* Call list all note API */}
  function loadNotes() {
    return API.get("notes", "/notes");
  }

  function renderNotesList(notes) {
    return [{}].concat(notes).map((note, i) =>
      i !== 0 ? (
        <LinkContainer key={note.noteId} to={`/notes/${note.noteId}`}>
          <ListGroupItem header={note.content.trim().split("\n")[0]}>
            {"Created: " + new Date(note.createdAt).toLocaleString()}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <LinkContainer key="new" to="/notes/new">
          <ListGroupItem>
            <h4>
            <i class="far fa-plus-square"></i> Create a new note
            </h4>
          </ListGroupItem>
        </LinkContainer>
      )
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Note4U</h1>
        <p>Note it down while you still remember!</p>
        <div>
        <Link to="/login" className="btn btn-lg"  style={{color: "green"}}>
        <span className="icon"><i className="far fa-sign-in-alt"></i></span><span style={{fontWeight: "bold"}}> Login</span>
        </Link>
        <Link to="/signup" className="btn btn-lg" style={{color: "green"}}>
        <span className="icon"><i className="far fa-user-plus"></i></span><span style={{fontWeight: "bold"}}> Signup</span>
        </Link>
      </div>
      </div>
    );
  }

  function renderNotes() {
    return (
      <div className="notes">
        <PageHeader>Your Notes</PageHeader>
        <ListGroup>
          {!isLoading && renderNotesList(notes)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}