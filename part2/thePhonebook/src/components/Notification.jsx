import React from 'react'

const Notification = ({ errorNotification,message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={errorNotification?'error':'success'}>
        {message}
      </div>
    )
  }

export default Notification