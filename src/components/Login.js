import React,{useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import AlertContext from '../context/alert/AlertContext';
import NoteContext from '../context/notes/NoteContext';

const Login = () => {
    const context = useContext(AlertContext); 
    const {showAlert} = context;
    const context1 = useContext(NoteContext);
    const {getUser} = context1;
    let navigate = useNavigate();
    const [credentials,setCredentials] = useState({email:"",password:""})
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const {email,password} = credentials;
        const response = await fetch(`http://localhost:5000/api/auth/login`,{
            method : 'POST',
            mode : 'cors',
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({email,password})
        });
        const json =  await response.json();
        if(json.success){
            //redirect to home page
            showAlert("You have successfully logged in","success");
            localStorage.setItem('token',json.authtoken);
            getUser();
            navigate("/");
        }
        else{
            //alert
            showAlert("Please use correct credentials", "warning");
        }

    }
    const handleChange = (e) => {
        setCredentials({...credentials,[e.target.name]: e.target.value});
    }
    
  return (
    <div className='container my-3'>
        <h2>Login to your account to use iNotebook</h2>
        <form onSubmit={handleSubmit} >
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" onChange={handleChange} value={credentials.email} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" onChange={handleChange} value={credentials.password} required/>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </div>
  )
}

export default Login
