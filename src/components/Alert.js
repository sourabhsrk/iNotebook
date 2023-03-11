import React, {useContext} from 'react'
import AlertContext from '../context/alert/AlertContext'

export default function Alert(props) {
  const context = useContext(AlertContext); 
  const {alert} = context;
  return (
    <div style={{height:'40px'}}>
    {alert && <div className={`alert alert-${alert.type}`} role="alert">
       {alert.msg}
    </div>}
    </div>
  )
}
