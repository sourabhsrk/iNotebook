import React, {useContext,useState} from 'react'
import NoteContext from '../context/notes/NoteContext'
import AlertContext from '../context/alert/AlertContext';

const Addnote = () => {
    const context = useContext(NoteContext); 
    const {addnote} = context;
    const alertcontext = useContext(AlertContext); 
    const {showAlert} = alertcontext;
    const [adnote,setAdnote] = useState ({title:"",description:"",tag:""})
    const handleAddnote = (e) => {
        e.preventDefault();
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("tag").value = "";
        addnote(adnote.title,adnote.description,adnote.tag);
        showAlert(`Your new note with title : ${adnote.title} has been added`,"success");
    }
    const handlechange = (e) => {
        setAdnote({...adnote,[e.target.name]: e.target.value});
    }
  return (
    <div>
      <h2>Add a note</h2>
      <form onSubmit={handleAddnote}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" onChange={handlechange} minLength={3} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="textarea" className="form-control" id="description" name="description" onChange={handlechange} minLength={6} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="textarea" className="form-control" id="tag" name="tag" onChange={handlechange} minLength={3} required/>
            </div>
            <button type="submit" className="btn btn-primary">Add note</button>
        </form>
    </div>
  )
}

export default Addnote
