import React, {useContext,useEffect,useState,useRef} from 'react'
import NoteContext from '../context/notes/NoteContext'
import AlertContext from '../context/alert/AlertContext'
import NoteItem from './NoteItem'
import { useNavigate } from 'react-router-dom'

const Notes = () => {
    const ref = useRef(null);
    const navigate = useNavigate();
    const context = useContext(NoteContext); 
    const {notes,fetchAllNotes,updatenote,getUser} = context;
    const alertcontext = useContext(AlertContext); 
    const {showAlert} = alertcontext;
    const [editedNote,setEditedNote] = useState({title:"",description:"",tag:""});
    const handlechange = (e) => {
        setEditedNote({...editedNote,[e.target.name]: e.target.value});
    }
    const editNote = (currNote) => {
        setEditedNote(currNote);
    }
    const updateNote = (e) =>{
        e.preventDefault();
        updatenote(editedNote._id,editedNote.title,editedNote.description,editedNote.tag);
        ref.current.click();
        showAlert(`Your Note : ${editedNote.title} has been updated` , "success");
    }
    useEffect(()=>{
        if(localStorage.getItem('token')){
        fetchAllNotes();
        getUser();
        }
        else{
            navigate('/login');
        }
        // eslint-disable-next-line
    },[])
    
  return (
    <>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Your Note Here</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form onSubmit={updateNote}>
        <div className="modal-body">
        
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={editedNote.title} onChange={handlechange} minLength={3} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="textarea" className="form-control" id="description" name="description" value={editedNote.description} onChange={handlechange} minLength={6} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="textarea" className="form-control" id="tag" name="tag" value={editedNote.tag} onChange={handlechange} minLength={3} required/>
                </div>
            
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={ref}>Close</button>
            <button type="submit" id="update" className="btn btn-primary">Update note</button>
        </div>
        </form>
        </div>
    </div>
    </div>

    <div className='row my-5'>
       <h2>Your Notes</h2>
       <div className='container'>
        {notes.length===0 && "No Notes to display"}
        </div>
        {notes.map((note)=>{
            return <NoteItem key={note._id}  editNote={editNote} note={note} />;
        })}
    </div>
    </>
  )
}

export default Notes
