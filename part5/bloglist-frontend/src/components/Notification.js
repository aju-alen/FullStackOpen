import React from 'react'

const Notification = ({errorMsg,successMsg}) => {
    if(errorMsg === null & successMsg === null) return null
  
    else if(errorMsg && successMsg === null){
        return (
            <div style={{  
                border: '3px solid red',
                borderRadius:'20px',
                padding:'4px',
            marginBottom:'5px',
            color:'red'
        }} >{errorMsg}</div>
          )
    }
    else if(errorMsg === null && successMsg){
        return (
            <div style={{  
                border: '3px solid green',
                borderRadius:'20px',
                padding:'4px',
            marginBottom:'5px',
            color:'green'
        }} >{successMsg}</div>
          )
    }
   
}

export default Notification