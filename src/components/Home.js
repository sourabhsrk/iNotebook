import React from 'react'
import Notes from './Notes'
import Addnote from './Addnote'


const Home = () => {

  return (
    <div className="container my-3">
       <h1>Welcome to iNotebook</h1>
       <Addnote/>
       <Notes/>
    </div>
  )
}

export default Home
