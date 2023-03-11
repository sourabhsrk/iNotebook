import React, {useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'

const NoteItem = (props) => {
    const context = useContext(NoteContext); 
    const {deletenote} = context;
    const {note,editNote} = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <p className="card-text">{note.tag}</p>
            <p className="card-text"><small className="text-danger">created on {new Date(note.date).toGMTString()}</small></p>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{editNote(note)}} data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
            <i className="fa-regular fa-trash-can mx-2" onClick={()=>{deletenote(note._id)}}></i>
        </div>
        </div>
    </div>
  )
}

export default NoteItem
