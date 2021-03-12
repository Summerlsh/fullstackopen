import React from 'react'

import './Notification.css'

const Notification = ({ text, type }) => {
  if (text === '') {
    return null
  }

  let className = 'message'
  if (type === 'success') {
    className += ' success'
  } else if (type === 'error') {
    className += ' error'
  }

  return (
    <div className={className}>{text}</div>
  )
}

export default Notification
