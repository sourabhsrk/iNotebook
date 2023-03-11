import NoteContext from './NoteContext';
import AlertContext from '../alert/AlertContext';
import {useState,useContext} from 'react';


const NoteState = (props) => {
    const context = useContext(AlertContext); 
    const {showAlert} = context;
    const host = "http://localhost:5000";
    const [notes,setNotes] = useState([]);
    const [username,setUsername] = useState("");

    // get user data
    const getUser = async() => {
        //API CALL
        const response = await fetch(`${host}/api/auth/getuser`,{
            method : 'POST',
            mode : 'cors',
            headers : {
                "Content-Type" : "application/json",
                "auth-token"   :  localStorage.getItem('token') 
            }
        });
        const json = await response.json();
        setUsername(json.name);
    }
     // fetch all notes function
    const fetchAllNotes = async() => {
    //API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`,{
        method : 'GET',
        mode : 'cors',
        headers : {
            "Content-Type" : "application/json",
            "auth-token"   :  localStorage.getItem('token') 
        }
    });
    const json = await response.json();
    setNotes(json);
    }

    // add note function
    const addnote = async(title,description,tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/addnote`,{
        method : 'POST',
        mode : 'cors',
        headers : {
            "Content-Type" : "application/json",
            "auth-token"   :  localStorage.getItem('token') 
        },
        body : JSON.stringify({title,description,tag})
    });
    const json = await response.json();
    setNotes(notes.concat(json));
    }
    // edit note function
    const updatenote = async(id,title,description,tag) => {   
    
    //API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
        method : 'PUT',
        mode : 'cors',
        headers : {
            "Content-Type" : "application/json",
            "auth-token"   :  localStorage.getItem('token')
        },
        body : JSON.stringify({title,description,tag})
    });
    const json = await response.json();
    console.log(json);
    ///////////////////////
    let newNotes = JSON.parse(JSON.stringify(notes));
    for(let i=0;i<newNotes.length;i++){
        if(newNotes[i]._id===id){
            newNotes[i].title=title;
            newNotes[i].description=description;
            newNotes[i].tag=tag;
            break;
        }
    }

    setNotes(newNotes);
    }
    // delete note function
    const deletenote = async(id) =>{
    //API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
        method : 'DELETE',
        mode : 'cors',
        headers : {
            "Content-Type" : "application/json",
            "auth-token"   :  localStorage.getItem('token') 
        }
    });
    const json = await response.json();
    if(json.success){
        showAlert("Your Note has been Deleted","success");
    }
    ///////////////////
    const newNotes = notes.filter((note)=>{
        return note._id!==id});
    setNotes(newNotes);
    }
    return(
        <NoteContext.Provider value={{notes,username,getUser,fetchAllNotes,addnote,updatenote,deletenote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;